const searchRouter = require('express').Router();
const Artwork = require('../models/artwork');

searchRouter.get("/:search", async (request, response) => {
  const results = await Artwork.aggregate([
    {
      $search: {
        index: "search_painting",
        compound: {
          must: [
            {
              text: {
                query: request.params.search,
                path: "title",
                fuzzy: {},
              },
            },
          ],
        },
      },
    },
    {
      $limit: 20,
    },
    {
      $project: {
        _id: 0,
        title: 1,
      },
    },
  ]);

  response.status(200).send(results);
});

searchRouter.get("/autocomplete/:search", async (request, response) => {
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
        title: 1,
        highlights: {
          $meta: "searchHighlights",
        },
      },
    },
  ]);

  response.status(200).send(results);
});

module.exports = searchRouter