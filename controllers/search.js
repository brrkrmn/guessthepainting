const searchRouter = require('express').Router();
const Artwork = require('../models/artwork');

searchRouter.get("/paintings/:search", async (request, response) => {
  const results = await Artwork.aggregate([
    {
      $search: {
        index: "autocomplete_painting",
        autocomplete: {
          query: request.params.search,
          path: "title",
        },
        highlight: {
          path: ["title"],
        },
      },
    },
    {
      $limit: 20,
    },
    {
      $project: {
        _id: 1,
        title: 1,
      },
    },
  ]);

  response.status(200).send(results);
});

module.exports = searchRouter