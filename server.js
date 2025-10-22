import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const target = req.query.url;
  const token = req.query.token;

  if (!target || !token) {
    return res.status(400).json({ error: "Missing url or token" });
  }

  try {
    const r = await fetch(target, {
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      }
    });

    const text = await r.text();
    try {
      const json = JSON.parse(text);
      res.json(json);
    } catch {
      console.error("Not JSON:", text.slice(0, 300));
      res.status(500).json({ error: "Invalid JSON from WB", text: text.slice(0, 300) });
    }
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ WB proxy running on port ${PORT}`));
