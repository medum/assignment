const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/proxy-image", async (req, res) => {
  try {
    const imageUrl = req.query.url; // Get image URL from query parameter
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    res.set("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
});

app.listen(5000, () => console.log("Proxy server running on port 5000"));
