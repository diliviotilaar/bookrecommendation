const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// endpoint example
app.get("/api/books", (req, res) => {
  res.json([
    { id: 1, title: "Book A" },
    { id: 2, title: "Book B" }
  ]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Backend running on http://localhost:" + PORT);
});
