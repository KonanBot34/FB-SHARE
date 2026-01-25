const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/share", async (req, res) => {
  const { cookie, link, limit } = req.body;

  if (!cookie || !link || !limit) {
    return res.json({
      status: "error",
      message: "missing fields"
    });
  }

  try {
    const url =
      "https://vern-rest-api.vercel.app/api/share" +
      `?cookie=${encodeURIComponent(cookie)}` +
      `&link=${encodeURIComponent(link)}` +
      `&limit=${encodeURIComponent(limit)}`;

    const apiRes = await fetch(url);
    const data = await apiRes.json();

    res.json(data);
  } catch (err) {
    res.json({
      status: "error",
      message: "api request failed"
    });
  }
});

app.listen(3000, () => {
  console.log("RUNNING http://localhost:3000");
});};
