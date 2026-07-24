import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuSparkles,
  LuFileSearch,
  LuShieldCheck,
  LuZap,
  LuUpload,
  LuBrainCircuit,
  LuLayoutDashboard,
} from "react-icons/lu";
import Card from "../components/Card.jsx";
import Button from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import "./Landing.css";

const features = [
  {
    icon: <LuFileSearch />,
    title: "Instant document parsing",
    desc: "Upload any PDF and DocSense AI extracts the full text and structure in seconds.",
  },
  {
    icon: <LuBrainCircuit />,
    title: "AI-powered analysis",
    desc: "Google Gemini generates summaries, key points, entities, and sentiment automatically.",
  },
  {
    icon: <LuShieldCheck />,
    title: "Private by default",
    desc: "Your documents are tied to your account with JWT-secured access, always.",
  },
];

const steps = [
  { icon: <LuUpload />, title: "Upload a PDF", desc: "Drag and drop any contract, report, or resume." },
  { icon: <LuZap />, title: "AI analyzes it", desc: "Gemini reads the document and extracts insight." },
  { icon: <LuLayoutDashboard />, title: "Review the results", desc: "Get a clean summary and key data points instantly." },
];

const Landing = () => {
  const { user } = useAuth();

  return (
    <div>
      <section className="ds-hero container">
        <motion.span
          className="ds-hero__eyebrow"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LuSparkles /> Powered by Google Gemini
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Understand any document in seconds, not hours.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          DocSense AI reads your PDFs and turns them into clear summaries, key points, and
          structured insight — so you never have to skim a contract or report again.
        </motion.p>

        <motion.div
          className="ds-hero__actions"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Link to={user ? "/dashboard" : "/register"}>
            <Button size="lg">{user ? "Go to dashboard" : "Start for free"}</Button>
          </Link>
          <Link to={user ? "/upload" : "/login"}>
            <Button size="lg" variant="secondary">
              {user ? "Upload a document" : "Log in"}
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="ds-features container">
        {features.map((f, i) => (
          <Card key={f.title} className="ds-feature-card" delay={i * 0.08}>
            <div className="ds-feature-card__icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </Card>
        ))}
      </section>

      <section className="ds-how container">
        <h2>How it works</h2>
        <div className="ds-how__grid">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              className="ds-how__step"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="ds-how__number">{i + 1}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
