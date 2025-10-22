import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", async (req, res) => {
  try {
    const { url, token } = req.query;
    if (!url || !token) return res.status(400).json({ error: "missing url/token" });

    const r = await fetch(url, {
      headers: { Authorization: token },
    });
    const text = await r.text();
    res.status(r.status).send(text);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("✅ WB proxy running on port " + PORT));
