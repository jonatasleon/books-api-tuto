import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorReponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class BooksController {
  constructor(Books) {
    this.Books = Books;
  }

  getAll() {
    return this.Books.findAll({})
      .then(result => defaultResponse(result))
      .catch(err => errorReponse(err.message));
  }

  getById(id) {
    return this.Books.findOne({ where: { id } })
      .then(result => defaultResponse(result))
      .catch(err => errorReponse(err.message));
  }

  create(book) {
    return this.Books.create(book)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(err => errorReponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(book, id) {
    return this.Books.update(book, { where: { id } })
      .then(result => defaultResponse(result))
      .catch(err => errorReponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(id) {
    return this.Books.destroy({ where: { id } })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(err => errorReponse(err.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default BooksController;
