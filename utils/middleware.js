require('dotenv').config();

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

const basicAuth = (request, response, next) => {
  const authHeader = request.headers['authorization'];

  if (!authHeader) {
    return response.status(401).json({ error: 'Authorization needed' })
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (username === process.env.BASIC_AUTH_USERNAME && password === process.env.BASIC_AUTH_PASSWORD) {
    return next();
  } else {
    return response.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  basicAuth
}