import React from "react";
import "./Badge.css";

const toneMap = {
  analyzed: "success",
  processing: "warning",
  failed: "danger",
  positive: "success",
  negative: "danger",
  neutral: "neutral",
  mixed: "warning",
};

const Badge = ({ children, tone }) => {
  const resolvedTone = tone || toneMap[String(children).toLowerCase()] || "neutral";
  return <span className={`ds-badge ds-badge--${resolvedTone}`}>{children}</span>;
};

export default Badge;
