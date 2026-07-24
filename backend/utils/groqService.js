// Groq's API is OpenAI-compatible, so we call it directly with fetch —
// no extra npm package needed since Node 20+ has fetch built in.

const MAX_INPUT_CHARS = 45000;

const buildPrompt = (text) => `
You are DocSense AI, a meticulous senior document analyst. Read the document below
carefully and think through it in full before answering — consider its purpose, its
author's intent, who would act on it, and what could go wrong if it's misunderstood.

Respond ONLY with strict JSON (no markdown fences, no commentary) in exactly this shape:

{
  "summary": "A thorough 5-8 sentence summary covering purpose, scope, and outcome",
  "keyPoints": ["6-10 specific, concrete bullet points capturing the substantive content"],
  "entities": ["important people, organizations, dates, monetary figures, or locations mentioned, each labeled inline, e.g. 'Acme Corp (organization)'"],
  "sentiment": "Positive | Neutral | Negative | Mixed",
  "category": "A single short label for the document type, e.g. Legal Contract, Research Paper, Resume, Invoice, Report",
  "actionItems": ["concrete next steps or obligations implied by the document, if any; empty array if none apply"],
  "risks": ["potential risks, ambiguities, missing information, or red flags a careful reader should notice; empty array if none apply"],
  "recommendations": ["2-4 practical recommendations for someone acting on this document"],
  "complexityLevel": "Simple | Moderate | Complex | Highly Technical",
  "targetAudience": "Who this document is written for, in a few words"
}

Be specific and grounded in the actual text — never invent facts that aren't present.
If a field genuinely doesn't apply, return an empty array or empty string for it rather
than guessing.

Document text:
"""
${text.slice(0, MAX_INPUT_CHARS)}
"""
`;

const safeJSONParse = (raw) => {
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error("Failed to parse AI response as JSON.");
  }
};

const analyzeDocumentWithGroq = async (text) => {
  if (!text || text.trim().length === 0) {
    throw new Error("No extractable text found in document.");
  }

  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not configured.");
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: buildPrompt(text) }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  const responseText = data.choices?.[0]?.message?.content || "";
  const parsed = safeJSONParse(responseText);

  return {
    summary: parsed.summary || "",
    keyPoints: Array.isArray(parsed.keyPoints) ? parsed.keyPoints : [],
    entities: Array.isArray(parsed.entities) ? parsed.entities : [],
    sentiment: parsed.sentiment || "Neutral",
    category: parsed.category || "General Document",
    actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems : [],
    risks: Array.isArray(parsed.risks) ? parsed.risks : [],
    recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
    complexityLevel: parsed.complexityLevel || "",
    targetAudience: parsed.targetAudience || "",
  };
};

module.exports = { analyzeDocumentWithGroq };