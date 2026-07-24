import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuFileText, LuCircleCheckBig, LuTriangleAlert, LuType, LuUpload } from "react-icons/lu";import DashboardLayout from "../components/DashboardLayout.jsx";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import Loader from "../components/Loader.jsx";
import Badge from "../components/Badge.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../api/axios";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/documents/stats/overview");
        setStats(data.stats);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <Loader fullScreen label="Loading your dashboard…" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "there"}`}
        subtitle="Here's a snapshot of your document activity."
        action={
          <Button icon={<LuUpload />} onClick={() => navigate("/upload")}>
            Upload document
          </Button>
        }
      />

      <div className="ds-stats-grid">
        <StatCard
          label="Total documents"
          value={stats?.totalDocuments ?? 0}
          icon={<LuFileText />}
          accent="brand"
          delay={0}
        />
        <StatCard
          label="Analyzed"
          value={stats?.analyzed ?? 0}
          icon={<LuCircleCheckBig />}
          accent="success"
          delay={0.05}
        />
        <StatCard
          label="Failed analysis"
          value={stats?.failed ?? 0}
          icon={<LuTriangleAlert/>}
          accent="warning"
          delay={0.1}
        />
        <StatCard
          label="Words processed"
          value={(stats?.totalWords ?? 0).toLocaleString()}
          icon={<LuType />}
          accent="ink"
          delay={0.15}
        />
      </div>

      <h2 className="ds-section-title">Recent documents</h2>

      {stats?.recentDocuments?.length ? (
        <Card>
          <div className="ds-recent-list">
            {stats.recentDocuments.map((doc) => (
              <div
                key={doc._id}
                className="ds-recent-item"
                onClick={() => navigate(`/documents/${doc._id}`)}
              >
                <div className="ds-recent-item__left">
                  <div className="ds-recent-item__icon">
                    <LuFileText />
                  </div>
                  <div>
                    <p className="ds-recent-item__name">{doc.originalName}</p>
                    <p className="ds-recent-item__date">
                      {new Date(doc.createdAt).toLocaleDateString(undefined, {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <Badge>{doc.status}</Badge>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <EmptyState
          icon={<LuFileText />}
          title="No documents yet"
          description="Upload your first PDF and let DocSense AI generate an instant summary and analysis."
          action={<Button onClick={() => navigate("/upload")}>Upload a document</Button>}
        />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
