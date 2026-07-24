const fs = require("fs");
const pdfParse = require("pdf-parse");

/**
 * Extracts raw text and metadata from a PDF file on disk.
 * @param {string} filePath - Absolute path to the PDF file.
 * @returns {Promise<{text: string, pageCount: number}>}
 */
const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);

  return {
    text: (data.text || "").trim(),
    pageCount: data.numpages || 0,
  };
};

const estimateReadingTime = (wordCount) => {
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
};

const countWords = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
};

module.exports = { extractTextFromPDF, estimateReadingTime, countWords };
