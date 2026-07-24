import React from "react";
import Card from "./Card.jsx";
import "./StatCard.css";

const StatCard = ({ label, value, icon, delay = 0, accent = "brand" }) => {
  return (
    <Card className="ds-stat" delay={delay}>
      <div className={`ds-stat__icon ds-stat__icon--${accent}`}>{icon}</div>
      <div>
        <p className="ds-stat__value">{value}</p>
        <p className="ds-stat__label">{label}</p>
      </div>
    </Card>
  );
};

export default StatCard;
