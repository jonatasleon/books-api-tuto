import express from 'express';
import bookRoutes from './books';
import userRoutes from './users';

export default (models) => {
  const router = new express.Router();

  router.use('/books', bookRoutes(models.Books));
  router.use('/users', userRoutes(models.Users));

  return router;
};
