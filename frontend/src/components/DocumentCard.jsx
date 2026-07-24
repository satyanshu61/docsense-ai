import React from "react";
import { useNavigate } from "react-router-dom";
import { LuFileText, LuTrash2, LuClock } from "react-icons/lu";
import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import "./DocumentCard.css";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
};

const formatSize = (bytes) => {
  if (!bytes) return "0 KB";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const DocumentCard = ({ doc, onDelete, delay = 0 }) => {
  const navigate = useNavigate();

  return (
    <Card hover delay={delay} className="ds-doc-card" onClick={() => navigate(`/documents/${doc._id}`)}>
      <div className="ds-doc-card__top">
        <div className="ds-doc-card__icon">
          <LuFileText />
        </div>
        <Badge>{doc.status}</Badge>
      </div>

      <h3 className="ds-doc-card__title" title={doc.originalName}>
        {doc.originalName}
      </h3>

      {doc.analysis?.category && (
        <p className="ds-doc-card__category">{doc.analysis.category}</p>
      )}

      <div className="ds-doc-card__meta">
        <span><LuClock /> {formatDate(doc.createdAt)}</span>
        <span>{formatSize(doc.fileSize)}</span>
      </div>

      <button
        className="ds-doc-card__delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(doc._id);
        }}
        aria-label={`Delete ${doc.originalName}`}
      >
        <LuTrash2 />
      </button>
    </Card>
  );
};

export default DocumentCard;
