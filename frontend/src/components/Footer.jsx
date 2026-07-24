import React from "react";
import { Link } from "react-router-dom";
import { LuFileText, LuGithub, LuLinkedin, LuTwitter } from "react-icons/lu";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="ds-footer">
      <div className="container ds-footer__inner">
        <div className="ds-footer__top">
          <div className="ds-footer__brand">
            <span className="ds-footer__mark"><LuFileText /></span>
            <span>DocSense AI</span>
          </div>

          <div className="ds-footer__columns">
            <div className="ds-footer__col">
              <p className="ds-footer__heading">Product</p>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/upload">Upload</Link>
              <Link to="/documents">Documents</Link>
            </div>
            <div className="ds-footer__col">
              <p className="ds-footer__heading">Account</p>
              <Link to="/login">Log in</Link>
              <Link to="/register">Sign up</Link>
            </div>
            <div className="ds-footer__col">
              <p className="ds-footer__heading">Company</p>
              <Link to="/about">About</Link>
              <Link to="/privacy">Privacy policy</Link>
              <Link to="/terms">Terms of service</Link>
            </div>
          </div>

          <div className="ds-footer__socials">
            <a href="#" aria-label="GitHub"><LuGithub /></a>
            <a href="#" aria-label="LinkedIn"><LuLinkedin /></a>
            <a href="#" aria-label="Twitter"><LuTwitter /></a>
          </div>
        </div>

        <div className="ds-footer__bottom">
          <p>© {year} DocSense AI. All rights reserved.</p>
          <p>Built with React, Node.js, and Google Gemini.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;