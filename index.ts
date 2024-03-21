import express from 'express';
import http from 'http';
import routes from './src/routes';

const app = express();

const server = http.createServer(app);

app.use(express.json());

app.use(routes);

server.listen(8000, () => {
  console.log('Server running on http://localhost:8000/');
});
