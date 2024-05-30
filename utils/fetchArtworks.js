const Artwork = require('../models/artwork')
const fs = require("fs-extra");
const path = require("path");

const fetchArtworks = async () => {
  const jsonPath = path.join(process.cwd(), "./artworkList/artworks");
  const files = await fs.readdir(jsonPath);

  for (const file of files) {
    const filePath = path.join(jsonPath, file);
    const artwork = await fs.readJson(filePath);
    if (artwork.artwork_type_title === "Painting") {
      const newArtwork = new Artwork({
        _id: artwork.id,
        title: artwork.title,
      });
      try {
        await newArtwork.save();
        console.log(`Artwork ${artwork.id} added: ${artwork.title}`);
      } catch (error) {
        console.log(error.message);
      }
    }
  }
};

module.exports = fetchArtworks