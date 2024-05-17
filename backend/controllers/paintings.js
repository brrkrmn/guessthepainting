const paintingsRouter = require('express').Router()
const paintings = require('../data/paintings');

paintingsRouter.get('/last-id', async (request, response) => {
  const lastActivePainting = paintings
    .sort((a, b) => b.id - a.id)
    .find(painting => painting.isActive)

  if (lastActivePainting) {
    response.status(200).json({ lastId: lastActivePainting.id })
  } else {
    response.status(404).json({ error: 'No active painting found' })
  }
})

paintingsRouter.get('/:id', async (request, response) => {

})

paintingsRouter.post('/', async (request, response) => {

})

module.exports = paintingsRouter