import express from 'express';
import bookRoutes from './books';
import userRoutes from './users';
import authRoutes from './auth';

export default (app) => {
  const router = new express.Router();
  const models = app.datasource.models;
  const config = app.config;

  router.use('/books', bookRoutes(models.Books));
  router.use('/users', userRoutes(models.Users));
  router.use('/auth', authRoutes(models.Users, config));

  return router;
};
