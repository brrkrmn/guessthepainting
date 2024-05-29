const Artwork = require('../models/artwork')
const axios = require('axios');

const fetchArtworks = async () => {
  let id = 0
  const apiUrl = 'https://api.artic.edu/api/v1/artworks/'
  const fields = '?fields=id,title,artwork_type_title'

  try {
    const lastAddedArtwork = await Artwork.findOne({}, {}, { sort: { '_id': -1 } });
    if (lastAddedArtwork) {
      id = Number(lastAddedArtwork.id) + 1
      console.log(`Resuming from ID:${id}`)
    }
  } catch (error) {
    console.lofg(`Error fetching last added ID:`, error)
  }

  while (true) {
    try {
      const response = await axios.get(`${apiUrl}${id}${fields}`)
      const artwork = response.data.data

      if (artwork && artwork.artwork_type_title === 'Painting') {
        const exists = await Artwork.exists({ id: artwork.id });

        if (!exists) {
          const newArtwork = new Artwork({
            _id: artwork.id,
            title: artwork.title,
          })
          await newArtwork.save()
          console.log(`Artwork ${artwork.id} added: ${artwork.title}`)
        } else {
          console.log(`Artwork ${artwork.id} already exists in DB`)
        }
      }
      id++;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(`ID ${id} not found, moving to next ID`);
        id++
      } else {
        console.log(`Error fetching data for ID ${id}:`, error.message)
        break;
      }
    }
  }
}

module.exports = fetchArtworks