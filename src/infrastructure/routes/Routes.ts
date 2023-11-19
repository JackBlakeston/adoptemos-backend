import express from 'express';
import { DogsRouter } from './Dogs.routes';

export const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Adoptame API!' });
});

router.use(new DogsRouter().router);
