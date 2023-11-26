import express from 'express';
import { DogRouter } from './DogRouter/DogRouter';

export const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Adoptame API!' });
});

router.use(new DogRouter().router);
