import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorReponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class UsersController {
  constructor(Users) {
    this.Users = Users;
  }

  getAll() {
    return this.Users.findAll({})
      .then(result => defaultResponse(result))
      .catch(err => errorReponse(err.message));
  }

  getById(id) {
    return this.Users.findOne({ where: { id } })
      .then(result => defaultResponse(result))
      .catch(err => errorReponse(err.message));
  }

  create(book) {
    return this.Users.create(book)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(err => errorReponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(book, id) {
    return this.Users.update(book, { where: { id } })
      .then(result => defaultResponse(result))
      .catch(err => errorReponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(id) {
    return this.Users.destroy({ where: { id } })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(err => errorReponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default UsersController;
