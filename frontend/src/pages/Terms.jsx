import React from "react";
import { LuFileText } from "react-icons/lu";
import "./StaticPage.css";

const Terms = () => {
  return (
    <div className="container">
      <div className="ds-static">
        <p className="ds-static__eyebrow"><LuFileText style={{ marginRight: 6 }} />Terms of Service</p>
        <h1>Terms of Service</h1>
        <p className="ds-static__updated">Last updated: July 2026</p>

        <p className="ds-static__lead">
          These terms govern your use of DocSense AI. By creating an account or uploading a
          document, you agree to the terms below.
        </p>

        <section>
          <h2>1. Using the service</h2>
          <p>
            DocSense AI lets you upload documents to receive an AI-generated summary and
            analysis. You must be legally able to enter into these terms and are responsible
            for keeping your account credentials secure.
          </p>
        </section>

        <section>
          <h2>2. Acceptable use</h2>
          <ul>
            <li>Don't upload documents you don't have the right to share or process.</li>
            <li>Don't use the service to process illegal content or to violate others' rights.</li>
            <li>Don't attempt to disrupt, reverse-engineer, or abuse the service or its infrastructure.</li>
          </ul>
        </section>

        <section>
          <h2>3. AI-generated content</h2>
          <p>
            Summaries, key points, risk flags, and recommendations are generated automatically
            by an AI model and may contain errors or omissions. DocSense AI is a reading aid,
            not a substitute for professional legal, financial, or medical review. Always
            verify important details against the original document.
          </p>
        </section>

        <section>
          <h2>4. Your content</h2>
          <p>
            You retain ownership of any documents you upload. By uploading a document, you
            grant us permission to store it and process it (including via third-party AI
            providers) solely to provide the analysis features of the service to you.
          </p>
        </section>

        <section>
          <h2>5. Availability</h2>
          <p>
            The service is provided "as is," without guarantee of uninterrupted availability.
            Features, models, and limits may change as the underlying AI providers update
            their offerings.
          </p>
        </section>

        <section>
          <h2>6. Account termination</h2>
          <p>
            You may stop using the service and delete your account at any time. We reserve the
            right to suspend accounts that violate these terms or misuse the service.
          </p>
        </section>

        <section>
          <h2>7. Limitation of liability</h2>
          <p>
            DocSense AI is not liable for decisions made based on AI-generated analysis. Use
            your own judgment, particularly for legal, financial, medical, or otherwise
            high-stakes documents.
          </p>
        </section>

        <section>
          <h2>8. Changes to these terms</h2>
          <p>
            We may revise these terms from time to time. Continued use of the service after an
            update constitutes acceptance of the revised terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;