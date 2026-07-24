import React from "react";
import { motion } from "framer-motion";
import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon = null,
  iconPosition = "left",
  loading = false,
  disabled = false,
  type = "button",
  onClick,
  fullWidth = false,
  ...rest
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: disabled || loading ? 0 : -1 }}
      className={`ds-btn ds-btn--${variant} ds-btn--${size} ${fullWidth ? "ds-btn--full" : ""}`}
      {...rest}
    >
      {loading ? (
        <span className="ds-btn__spinner" aria-hidden="true" />
      ) : (
        <>
          {icon && iconPosition === "left" && <span className="ds-btn__icon">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "right" && <span className="ds-btn__icon">{icon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;
