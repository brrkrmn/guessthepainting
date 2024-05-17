const requestLogger = (request, response, next) => {
  console.log('Method', request.method);
  console.log('Path', request.path);
  console.log('Body', request.body);
  next();
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log('Error:', error.message);
  response.status(500).send('Something went wrong')
  next(error);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}