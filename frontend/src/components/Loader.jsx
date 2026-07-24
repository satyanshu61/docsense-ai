import React from "react";
import { motion } from "framer-motion";
import "./Loader.css";

const Loader = ({ label = "Loading…", fullScreen = false }) => {
  return (
    <div className={`ds-loader ${fullScreen ? "ds-loader--full" : ""}`}>
      <div className="ds-loader__dots">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="ds-loader__dot"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {label && <p className="ds-loader__label">{label}</p>}
    </div>
  );
};

export default Loader;
