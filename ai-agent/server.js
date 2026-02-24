const express = require("express");
const app = express();

app.get("/analyze", (req, res) => {
  res.json({
    message: "AI Agent analyzing student registration trends..."
  });
});

app.listen(6000, () => console.log("AI Agent running on 6000"));
