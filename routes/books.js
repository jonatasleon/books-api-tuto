import express from 'express';
import BooksController from '../controllers/books';

export default (Books) => {
  const router = new express.Router();
  const booksController = new BooksController(Books);

  router.get('/', (req, res) => {
    booksController.getAll()
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.post('/', (req, res) => {
    booksController.create(req.body)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.get('/:id', (req, res) => {
    booksController.getById(req.params.id)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.put('/:id', (req, res) => {
    booksController.update(req.body, req.params.id)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.delete('/:id', (req, res) => {
    booksController.delete(req.params.id)
      .then((response) => {
        res.sendStatus(response.statusCode);
      });
  });

  return router;
};
