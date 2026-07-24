const fs = require("fs");
const path = require("path");
const Document = require("../models/Document");
const { extractTextFromPDF, countWords, estimateReadingTime } = require("../utils/pdfParser");
const { analyzeDocumentWithGemini } = require("../utils/geminiService");
// const { analyzeDocumentWithGemini } = require("../utils/geminiService");
const { analyzeDocumentWithGroq } = require("../utils/groqService");

// @route  POST /api/documents/upload
const uploadDocument = async (req, res) => {
  let savedFilePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please attach a PDF file.",
      });
    }

    savedFilePath = req.file.path;

    const doc = await Document.create({
      user: req.user._id,
      originalName: req.file.originalname,
      storedFileName: req.file.filename,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      status: "processing",
    });

    // Extract text
    const { text, pageCount } = await extractTextFromPDF(savedFilePath);
    const wordCount = countWords(text);

    doc.rawText = text;
    doc.pageCount = pageCount;
    doc.analysis.wordCount = wordCount;
    doc.analysis.readingTimeMinutes = estimateReadingTime(wordCount);

  let analysis = null;
    let usedProvider = "";

    try {
      analysis = await analyzeDocumentWithGemini(text);
      usedProvider = "gemini";
    } catch (geminiError) {
      console.warn(`[DocSense AI] Gemini failed, falling back to Groq: ${geminiError.message}`);
      try {
        analysis = await analyzeDocumentWithGroq(text);
        usedProvider = "groq";
      } catch (groqError) {
        console.error(`[DocSense AI] Groq fallback also failed: ${groqError.message}`);
        doc.status = "failed";
        doc.errorMessage = `Gemini error: ${geminiError.message} | Groq fallback error: ${groqError.message}`;
      }
    }

    if (analysis) {
      doc.analysis.summary = analysis.summary;
      doc.analysis.keyPoints = analysis.keyPoints;
      doc.analysis.entities = analysis.entities;
      doc.analysis.sentiment = analysis.sentiment;
      doc.analysis.category = analysis.category;
      doc.analysis.actionItems = analysis.actionItems;
      doc.analysis.risks = analysis.risks;
      doc.analysis.recommendations = analysis.recommendations;
      doc.analysis.complexityLevel = analysis.complexityLevel;
      doc.analysis.targetAudience = analysis.targetAudience;
      doc.aiProvider = usedProvider;
      doc.status = "analyzed";
    }

    await doc.save();

    res.status(201).json({
      success: true,
      message:
        doc.status === "analyzed"
          ? "Document uploaded and analyzed successfully."
          : "Document uploaded, but AI analysis failed.",
      document: doc,
    });
  } catch (error) {
    if (savedFilePath && fs.existsSync(savedFilePath)) {
      fs.unlinkSync(savedFilePath);
    }
    res.status(500).json({
      success: false,
      message: "Failed to process document.",
      error: error.message,
    });
  }
};

// @route  GET /api/documents
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id })
      .select("-rawText")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: documents.length,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch documents.",
      error: error.message,
    });
  }
};

// @route  GET /api/documents/:id
const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, user: req.user._id });

    if (!doc) {
      return res.status(404).json({ success: false, message: "Document not found." });
    }

    res.status(200).json({ success: true, document: doc });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch document.",
      error: error.message,
    });
  }
};

// @route  DELETE /api/documents/:id
const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findOne({ _id: req.params.id, user: req.user._id });

    if (!doc) {
      return res.status(404).json({ success: false, message: "Document not found." });
    }

    const filePath = path.join(__dirname, "..", "uploads", doc.storedFileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await doc.deleteOne();

    res.status(200).json({ success: true, message: "Document deleted successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete document.",
      error: error.message,
    });
  }
};

// @route  GET /api/documents/stats/overview
const getDashboardStats = async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user._id }).select("-rawText");

    const totalDocuments = documents.length;
    const analyzed = documents.filter((d) => d.status === "analyzed").length;
    const failed = documents.filter((d) => d.status === "failed").length;
    const totalWords = documents.reduce((sum, d) => sum + (d.analysis?.wordCount || 0), 0);

    res.status(200).json({
      success: true,
      stats: {
        totalDocuments,
        analyzed,
        failed,
        totalWords,
        recentDocuments: documents.slice(0, 5),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats.",
      error: error.message,
    });
  }
};

module.exports = {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
  getDashboardStats,
};
