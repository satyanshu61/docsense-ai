import React from "react";
import { LuSparkles } from "react-icons/lu";
import "./StaticPage.css";

const About = () => {
  return (
    <div className="container">
      <div className="ds-static">
        <p className="ds-static__eyebrow"><LuSparkles style={{ marginRight: 6 }} />About us</p>
        <h1>Making documents understandable, instantly.</h1>
        <p className="ds-static__lead">
          DocSense AI was built to solve a simple, everyday problem: documents take too long to
          read, and important details are easy to miss. We built a tool that reads for you,
          surfaces what matters, and gets out of your way.
        </p>

        <section>
          <h2>Our mission</h2>
          <p>
            Every day, people sign contracts they didn't fully read, skim reports and miss the
            one number that mattered, or spend an hour on a document that could have been
            understood in five minutes. DocSense AI exists to close that gap — turning dense
            PDFs, Word documents, and text files into clear summaries, key points, risks, and
            action items, powered by Google's Gemini models.
          </p>
        </section>

        <section>
          <h2>What we believe</h2>
          <ul>
            <li>Clarity should be the default, not a premium feature.</li>
            <li>Your documents are yours — private by default, never used to train anyone else's models.</li>
            <li>AI should highlight what's important, not replace your judgment.</li>
            <li>Good tools stay out of the way and just work.</li>
          </ul>
        </section>

        <section>
          <h2>How it works</h2>
          <p>
            Upload a PDF, Word document, or text file. DocSense AI extracts the full text,
            sends it to Gemini with a carefully engineered analysis prompt, and returns a
            structured breakdown — summary, key points, entities, sentiment, risks, and
            recommended next steps — in seconds.
          </p>
        </section>

        <section>
          <h2>Built by</h2>
          <p>DocSense AI is an independent project built with React, Node.js, MongoDB, and Google Gemini.</p>
        </section>
      </div>
    </div>
  );
};

export default About;