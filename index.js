const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || "3000";
const app = express();
const data = require("./data.json");




app.use(cors());
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.json(data);
});

app.get("/quotes", (req, res) => {
  res.json(data);
});

app.get("/quotes/:id", (req, res) => {
  const quote = data.find((q) => q.id == parseInt(req.params.id));
  if (!quote) return res.status(404).send("Quote not found");
  res.json(data);
});

app.post("/Postquotes", (req, res) => {
  const { author, text } = req.body;
  if (!author || !text)
    return res.status(400).send("Author and text are required");
  const quote = { id: data.length + 1, author, text };
  data.push(quote);
  res.json(data);
});

// app.delete("/delquotes/:id", (req, res) => {
//   const { id } = req.params;

//   const quote = data.findIndex((q) => q.id == id);
//   data.splice(quote, 1);

//   res.json(data);
//   console.log(id)
// });

// GET /quotes - returns all the quotes
// GET /quotes/:id - returns a specific quote by ID
// POST /quotes - adds a new quote to the array

app.listen(port, () => {
  console.log(`Quote API is listening on port ${port}`);
});
