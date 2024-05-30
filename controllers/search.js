const searchRouter = require('express').Router();
const Artwork = require('../models/artwork');

searchRouter.get('/:search', async (request, response) => {
  const query = request.params.search;

  let searcher_aggregate = {
    $search: {
      index: "search_painting",
      compound: {
        must: [
          {
            text: {
              query: query,
              path: "title",
              fuzzy: {},
            },
          },
        ],
      },
    },
  };

  let projection = {
    $project: {
      _id: 0,
      title: 1,
    },
  };

  let results = await Artwork.aggregate([searcher_aggregate, projection]).limit(
    20
  );
  response.status(200).send(results);
})


module.exports = searchRouter