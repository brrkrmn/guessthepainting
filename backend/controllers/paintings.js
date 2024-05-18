require('dotenv').config();
const paintingsRouter = require('express').Router();
const paintings = require('../data/paintings');
const Painting = require('../models/painting');
const { basicAuth } = require('../utils/middleware');

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
  const painting = paintings
    .find(item => item.id === Number(request.params.id))

  if (painting) {
    response.status(200).json(painting)
  } else {
    response.status(404).json({ error: 'No painting found' })
  }
})

paintingsRouter.post('/', basicAuth, async (request, response) => {
  const body = request.body;
  const totalPaintings = await Painting.find().count();

  const painting = new Painting({
    _id: totalPaintings + 1,
    title: body.title,
    hints: body.hints,
  })

  const savedPainting = await painting.save()

  response.status(201).json(savedPainting)
})

module.exports = paintingsRouter