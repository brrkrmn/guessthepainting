const Artwork = require("../models/artwork");
const fs = require("fs");
const path = require("path");

const fetchTitles = async () => {
  const jsonPath = path.join(process.cwd(), "./artworkList/titles.json");
  const jsonData = fs.readFileSync(jsonPath, "utf-8");
  const items = JSON.parse(jsonData);
  console.log(`Extracted ${items.length} items from the JSON file.`);

  for (const item of items) {
    const existingItem = await Artwork.findOne({ title: item });
    if (!existingItem) {
      const newItem = new Artwork({
        title: item,
      });
      try {
        await newItem.save();
        console.log("Item added:", item);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      console.log("Item already exists", item);
    }
  }
};

module.exports = fetchTitles;
