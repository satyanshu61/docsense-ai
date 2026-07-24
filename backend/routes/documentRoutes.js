const express = require("express");
const {
  uploadDocument,
  getDocuments,
  getDocumentById,
  deleteDocument,
  getDashboardStats,
} = require("../controllers/documentController");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.use(protect);

router.get("/stats/overview", getDashboardStats);
router.post("/upload", upload.single("document"), uploadDocument);
router.get("/", getDocuments);
router.get("/:id", getDocumentById);
router.delete("/:id", deleteDocument);

module.exports = router;
