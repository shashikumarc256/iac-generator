const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const DEPLOYMENT_NAME = process.env.DEPLOYMENT_NAME;
const API_KEY = process.env.AZURE_OPENAI_KEY;
const API_VERSION = "2023-05-15";

app.post("/generate", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const codexResponse = await axios.post(
      `${AZURE_ENDPOINT}openai/deployments/${DEPLOYMENT_NAME}/completions?api-version=${API_VERSION}`,
      {
        prompt: prompt,
        max_tokens: 800,
        temperature: 0.3
      },
      {
        headers: {
          "api-key": API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const output = codexResponse.data.choices[0].text.trim();
    res.json({ code: output });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to get response from Codex" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
