import express from 'express';
import http from 'http';
import routes from './src/routes';
import mongoose from 'mongoose';
import ProductRepository from './src/repositories/product.repository';
import UserRepository from './src/repositories/user.repository';
import CartRepository from './src/repositories/cart.repository';

const app = express();

const server = http.createServer(app);

app.use(express.json());

app.use(routes);

server.listen(8000, () => {
  console.log('Server running on http://localhost:8000/');
});

const uri =
  'mongodb+srv://nemanjakostovski:XuJj7kpEjyQtSPWm@expressapi.r2tplzb.mongodb.net/?retryWrites=true&w=majority&appName=ExpressAPI';

mongoose
  .connect(uri)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

ProductRepository.initModel();
UserRepository.initModel();
CartRepository.initModel();
