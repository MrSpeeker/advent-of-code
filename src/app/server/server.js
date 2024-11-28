const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;
const session =
  "53616c7465645f5fc2b4687a8f992cffff9ec0d4feb3b271f2c663c3962d5340e0f2609fdec9f9a05c0126ef0b3a513e3c04a03b03c5b74f2074d3c7582ef48f";

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/fetch-data", async (req, res) => {
  const { year, day } = req.query;
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  try {
    const response = await axios.get(url, {
      headers: {
        Cookie: `session=${session}`,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
