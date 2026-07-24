import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  LuArrowLeft,
  LuFileText,
  LuCalendar,
  LuHash,
  LuClock,
  LuSparkles,
  LuListChecks,
  LuTags,
  LuSmile,
  LuTrash2,
  LuTriangleAlert,
  LuCircleCheck,
  LuShieldAlert,
  LuLightbulb,
  LuGauge,
  LuUsers,
} from "react-icons/lu";
import DashboardLayout from "../components/DashboardLayout.jsx";
import Card from "../components/Card.jsx";
import Badge from "../components/Badge.jsx";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";
import api from "../api/axios";
import "./DocumentView.css";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatSize = (bytes) => {
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const DocumentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const { data } = await api.get(`/documents/${id}`);
        setDoc(data.document);
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this document permanently?")) return;
    await api.delete(`/documents/${id}`);
    navigate("/documents");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loader fullScreen label="Loading document analysis…" />
      </DashboardLayout>
    );
  }

  if (notFound || !doc) {
    return (
      <DashboardLayout>
        <EmptyState
          icon={<LuFileText />}
          title="Document not found"
          description="It may have been deleted, or the link is incorrect."
          action={<Link to="/documents"><Button>Back to documents</Button></Link>}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Link to="/documents" className="ds-doc-view__back">
        <LuArrowLeft /> Back to documents
      </Link>

      <div className="ds-doc-view__header">
        <div>
          <div className="ds-doc-view__title-row">
            <h1>{doc.originalName}</h1>
            <Badge>{doc.status}</Badge>
          </div>
          <div className="ds-doc-view__meta">
            <span><LuCalendar /> {formatDate(doc.createdAt)}</span>
            <span><LuHash /> {doc.pageCount} page{doc.pageCount === 1 ? "" : "s"}</span>
            <span><LuClock /> {doc.analysis?.readingTimeMinutes || 0} min read</span>
            <span>{formatSize(doc.fileSize)}</span>
          </div>
        </div>
        <Button variant="danger" icon={<LuTrash2 />} onClick={handleDelete}>
          Delete
        </Button>
      </div>

      {doc.status === "failed" && (
        <Card style={{ marginBottom: 20, borderColor: "var(--color-danger)" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <LuTriangleAlert color="var(--color-danger)" size={20} />
            <div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>AI analysis failed</p>
              <p style={{ fontSize: 13, color: "var(--color-ink-500)" }}>
                {doc.errorMessage || "Something went wrong while analyzing this document."}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="ds-doc-view__grid">
        <div>
          <Card className="ds-doc-section" as="div">
            <h3><LuSparkles /> Summary</h3>
            <p>{doc.analysis?.summary || "No summary available yet."}</p>
          </Card>

          {doc.analysis?.keyPoints?.length > 0 && (
            <Card className="ds-doc-section">
              <h3><LuListChecks /> Key points</h3>
              <ul className="ds-keypoints">
                {doc.analysis.keyPoints.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </Card>
          )}

        {doc.analysis?.entities?.length > 0 && (
            <Card className="ds-doc-section">
              <h3><LuTags /> Entities mentioned</h3>
              <div className="ds-entities">
                {doc.analysis.entities.map((entity, i) => (
                  <span key={i} className="ds-entity-chip">{entity}</span>
                ))}
              </div>
            </Card>
          )}

          {doc.analysis?.actionItems?.length > 0 && (
            <Card className="ds-doc-section">
              <h3><LuCircleCheck /> Action items</h3>
              <ul className="ds-keypoints">
                {doc.analysis.actionItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Card>
          )}

          {doc.analysis?.risks?.length > 0 && (
            <Card className="ds-doc-section">
              <h3><LuShieldAlert /> Risks & flags</h3>
              <ul className="ds-keypoints">
                {doc.analysis.risks.map((risk, i) => (
                  <li key={i}>{risk}</li>
                ))}
              </ul>
            </Card>
          )}

         {doc.analysis?.entities?.length > 0 && (
            <Card className="ds-doc-section">
              <h3><LuTags /> Entities mentioned</h3>
              <div className="ds-entities">
                {doc.analysis.entities.map((entity, i) => (
                  <span key={i} className="ds-entity-chip">{entity}</span>
                ))}
              </div>
            </Card>
          )}

          {doc.analysis?.actionItems?.length > 0 && (
            <Card className="ds-doc-section">
              <h3><LuCircleCheck /> Action items</h3>
              <ul className="ds-keypoints">
                {doc.analysis.actionItems.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Card>
          )}

          {doc.analysis?.risks?.length > 0 && (
            <Card className="ds-doc-section">
              <h3><LuShieldAlert /> Risks & flags</h3>
              <ul className="ds-keypoints">
                {doc.analysis.risks.map((risk, i) => (
                  <li key={i}>{risk}</li>
                ))}
              </ul>
            </Card>
          )}

          {doc.analysis?.recommendations?.length > 0 && (
            <Card className="ds-doc-section">
              <h3><LuLightbulb /> Recommendations</h3>
              <ul className="ds-keypoints">
                {doc.analysis.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </Card>
          )}
        </div>
        <div>
       <Card className="ds-sidebar-card">
            <h3 style={{ fontSize: 14, marginBottom: 10 }}><LuSmile /> Overview</h3>
            <div className="ds-info-row">
              <span>Category</span>
              <span>{doc.analysis?.category || "—"}</span>
            </div>
            <div className="ds-info-row">
              <span>Sentiment</span>
              <span><Badge tone={doc.analysis?.sentiment?.toLowerCase()}>{doc.analysis?.sentiment || "—"}</Badge></span>
            </div>
            <div className="ds-info-row">
              <span>Word count</span>
              <span>{(doc.analysis?.wordCount || 0).toLocaleString()}</span>
            </div>
            <div className="ds-info-row">
              <span>Reading time</span>
              <span>{doc.analysis?.readingTimeMinutes || 0} min</span>
            </div>
            <div className="ds-info-row">
              <span>Pages</span>
              <span>{doc.pageCount}</span>
            </div>
          </Card>

          {(doc.analysis?.complexityLevel || doc.analysis?.targetAudience) && (
            <Card className="ds-sidebar-card">
              <h3 style={{ fontSize: 14, marginBottom: 10 }}><LuGauge /> Reading profile</h3>
              {doc.analysis?.complexityLevel && (
                <div className="ds-info-row">
                  <span>Complexity</span>
                  <span>{doc.analysis.complexityLevel}</span>
                </div>
              )}
              {doc.analysis?.targetAudience && (
                <div className="ds-info-row">
                  <span><LuUsers style={{ marginRight: 4 }} />Audience</span>
                  <span>{doc.analysis.targetAudience}</span>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DocumentView;
