const axios = require('axios');

const geminiClient = async (prompt) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const payload = {
    contents: [{
      parts: [{ text: prompt }]
    }]
  };

  try {
    const response = await axios.post(url, payload);
    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return reply || "🌈 The fortune mist is unclear...";
  } catch (error) {
    console.error("Gemini error:", error.message);
    return "⚠️ Oops! Fortune generator failed.";
  }
};

module.exports = geminiClient;
