import express from 'express';
import UsersController from '../controllers/users';

export default (Users) => {
  const router = new express.Router();
  const usersController = new UsersController(Users);

  router.get('/', (req, res) => {
    usersController.getAll()
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.post('/', (req, res) => {
    usersController.create(req.body)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.get('/:id', (req, res) => {
    usersController.getById(req.params.id)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.put('/:id', (req, res) => {
    usersController.update(req.body, req.params.id)
      .then((response) => {
        res.status(response.statusCode);
        res.json(response.data);
      });
  });

  router.delete('/:id', (req, res) => {
    usersController.delete(req.params.id)
      .then((response) => {
        res.sendStatus(response.statusCode);
      });
  });

  return router;
};
