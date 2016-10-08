import express from 'express';
// import BooksController from '../controllers/books';

export default (Books) => {
  const router = new express.Router();

  router.get('/', (req, res) => {
    Books.findAll({})
      .then(result => res.json(result))
      .catch(() => res.status(412));
  });

  router.post('/', (req, res) => {
    Books.create(req.body)
      .then(result => res.json(result))
      .catch(() => res.status(412));
  });

  router.get('/:id', (req, res) => {
    Books.findOne({
      id: req.params.id,
    })
      .then(result => res.json(result))
      .catch(() => res.status(412));
  });

  router.put('/:id', (req, res) => {
    Books.update(req.body, {
      where: req.params,
    })
      .then(result => res.json(result))
      .catch(() => res.status(412));
  });

  router.delete('/:id', (req, res) => {
    Books.destroy({
      where: req.params,
    })
      .then(() => res.sendStatus(204))
      .catch(() => res.status(412));
  });

  return router;
};
