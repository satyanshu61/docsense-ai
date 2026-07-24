import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuCloudUpload, LuFileText, LuX, LuSparkles } from "react-icons/lu";
import DashboardLayout from "../components/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";
import api from "../api/axios";
import "./Upload.css";

const formatSize = (bytes) => {
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const Upload = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const validateAndSetFile = (selected) => {
    setError("");
    if (!selected) return;
    if (selected.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum size is 10MB.");
      return;
    }
    setFile(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    validateAndSetFile(dropped);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("document", file);

    try {
      const { data } = await api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/documents/${data.document._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed. Please try again.");
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="ds-upload">
        <PageHeader
          title="Upload a document"
          subtitle="Upload a PDF and DocSense AI will summarize and analyze it automatically."
        />

        {uploading ? (
          <Card className="ds-upload__processing">
            <Loader label="Extracting text and running AI analysis…" />
            <p style={{ fontSize: 13, color: "var(--color-ink-400)" }}>
              This usually takes a few seconds depending on document length.
            </p>
          </Card>
        ) : (
          <>
            <div
              className={`ds-dropzone ${dragActive ? "ds-dropzone--active" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              <div className="ds-dropzone__icon">
                <LuCloudUpload />
              </div>
              <h3>Drag & drop your PDF here</h3>
              <p>or click to browse from your computer</p>
              <p className="ds-dropzone__hint">PDF only · Max 10MB</p>
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => validateAndSetFile(e.target.files?.[0])}
              />
            </div>

            {file && (
              <Card className="ds-file-preview">
                <div className="ds-file-preview__icon">
                  <LuFileText />
                </div>
                <div>
                  <p className="ds-file-preview__name">{file.name}</p>
                  <p className="ds-file-preview__size">{formatSize(file.size)}</p>
                </div>
                <button className="ds-file-preview__remove" onClick={() => setFile(null)}>
                  <LuX />
                </button>
              </Card>
            )}

            {error && <div className="ds-upload__error">{error}</div>}

            <div className="ds-upload__actions">
              <Button
                icon={<LuSparkles />}
                disabled={!file}
                onClick={handleUpload}
                fullWidth
                size="lg"
              >
                Analyze document
              </Button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Upload;
