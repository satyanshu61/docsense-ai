import React from "react";
import { motion } from "framer-motion";
import "./Card.css";

const Card = ({ children, className = "", hover = false, as = "div", delay = 0, ...rest }) => {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={`ds-card ${hover ? "ds-card--hover" : ""} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Card;
