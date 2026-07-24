import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch, LuFileText, LuUpload } from "react-icons/lu";
import DashboardLayout from "../components/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import DocumentCard from "../components/DocumentCard.jsx";
import api from "../api/axios";
import "./Documents.css";

const Documents = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchDocuments = async () => {
    try {
      const { data } = await api.get("/documents");
      setDocuments(data.documents);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document permanently?")) return;
    try {
      await api.delete(`/documents/${id}`);
      setDocuments((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return documents;
    const q = query.toLowerCase();
    return documents.filter(
      (d) =>
        d.originalName.toLowerCase().includes(q) ||
        d.analysis?.category?.toLowerCase().includes(q)
    );
  }, [documents, query]);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader fullScreen label="Loading your documents…" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="My documents"
        subtitle={`${documents.length} document${documents.length === 1 ? "" : "s"} analyzed`}
        action={
          <Button icon={<LuUpload />} onClick={() => navigate("/upload")}>
            Upload document
          </Button>
        }
      />

      {documents.length > 0 && (
        <div className="ds-documents-toolbar">
          <div className="ds-search">
            <LuSearch />
            <input
              placeholder="Search by name or category…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {documents.length === 0 ? (
        <EmptyState
          icon={<LuFileText />}
          title="No documents yet"
          description="Upload your first PDF to see it appear here with a full AI analysis."
          action={<Button onClick={() => navigate("/upload")}>Upload a document</Button>}
        />
      ) : filtered.length === 0 ? (
        <EmptyState icon={<LuSearch />} title="No matches" description="Try a different search term." />
      ) : (
        <div className="ds-documents-grid">
          {filtered.map((doc, i) => (
            <DocumentCard key={doc._id} doc={doc} onDelete={handleDelete} delay={i * 0.04} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Documents;
