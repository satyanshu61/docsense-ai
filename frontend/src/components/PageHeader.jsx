import React from "react";
import "./PageHeader.css";

const PageHeader = ({ title, subtitle, action }) => {
  return (
    <div className="ds-page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="ds-page-header__action">{action}</div>}
    </div>
  );
};

export default PageHeader;
