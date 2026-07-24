const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    storedFileName: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
      default: 0,
    },
    rawText: {
      type: String,
      default: "",
    },
   status: {
      type: String,
      enum: ["processing", "analyzed", "failed"],
      default: "processing",
    },
    aiProvider: {
      type: String,
      enum: ["gemini", "groq", ""],
      default: "",
    },
    analysis: {
      summary: { type: String, default: "" },
      keyPoints: [{ type: String }],
      entities: [{ type: String }],
      sentiment: { type: String, default: "" },
      wordCount: { type: Number, default: 0 },
      readingTimeMinutes: { type: Number, default: 0 },
      category: { type: String, default: "" },
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", DocumentSchema);
