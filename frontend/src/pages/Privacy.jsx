import React from "react";
import { LuShieldCheck } from "react-icons/lu";
import "./StaticPage.css";

const Privacy = () => {
  return (
    <div className="container">
      <div className="ds-static">
        <p className="ds-static__eyebrow"><LuShieldCheck style={{ marginRight: 6 }} />Privacy policy</p>
        <h1>Privacy Policy</h1>
        <p className="ds-static__updated">Last updated: July 2026</p>

        <p className="ds-static__lead">
          This policy explains what information DocSense AI collects, how it's used, and the
          choices you have. We aim to collect only what's needed to run the service well.
        </p>

        <section>
          <h2>1. Information we collect</h2>
          <ul>
            <li><strong>Account information:</strong> your name, email address, and a securely hashed password.</li>
            <li><strong>Document data:</strong> the files you upload, the text extracted from them, and the AI-generated analysis.</li>
            <li><strong>Usage data:</strong> basic activity such as login times and document counts, used only to operate your dashboard.</li>
          </ul>
        </section>

        <section>
          <h2>2. How we use your information</h2>
          <p>
            Your data is used solely to provide the service: authenticating your account,
            storing and displaying your documents, and generating AI analysis via Google
            Gemini. We do not sell your data or share it with advertisers.
          </p>
        </section>

        <section>
          <h2>3. Document processing</h2>
          <p>
            Uploaded documents are stored on our server and associated only with your account.
            Extracted text is sent to Google's Gemini API for analysis; this text is processed
            according to Google's API data-handling terms and is not used by us to train any
            model.
          </p>
        </section>

        <section>
          <h2>4. Data retention & deletion</h2>
          <p>
            You can delete any document permanently at any time from the Documents page, which
            removes both the file and its analysis from our systems. If you'd like your entire
            account deleted, contact us and we'll remove your account and associated data.
          </p>
        </section>

        <section>
          <h2>5. Security</h2>
          <p>
            Passwords are hashed with bcrypt before storage. Access to your documents and
            analysis is protected by JWT-based authentication, and API routes are scoped so
            that only you can view or delete your own documents.
          </p>
        </section>

        <section>
          <h2>6. Third-party services</h2>
          <p>
            We use MongoDB for data storage and Google Gemini for document analysis. Each of
            these providers has its own privacy and data-handling practices, which apply to
            data processed on their infrastructure.
          </p>
        </section>

        <section>
          <h2>7. Your choices</h2>
          <p>
            You may update your account details, delete individual documents, or request full
            account deletion at any time. We will not retain data longer than necessary to
            provide the service to you.
          </p>
        </section>

        <section>
          <h2>8. Changes to this policy</h2>
          <p>
            We may update this policy occasionally. Material changes will be reflected on this
            page with an updated "last updated" date.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;