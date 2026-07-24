import React from "react";
import "./EmptyState.css";

const EmptyState = ({ icon, title, description, action }) => {
  return (
    <div className="ds-empty">
      {icon && <div className="ds-empty__icon">{icon}</div>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {action && <div className="ds-empty__action">{action}</div>}
    </div>
  );
};

export default EmptyState;
