const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});

const errorReponse = (message, statusCode = 400) => defaultResponse({
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
      .then(result => defaultResponse(result, 201))
      .catch(err => errorReponse(err.message, 422));
  }

  update(book, id) {
    return this.Books.update(book, { where: { id } })
      .then(result => defaultResponse(result))
      .catch(err => errorReponse(err.message, 422));
  }

  delete(id) {
    return this.Books.destroy({ where: { id } })
      .then(result => defaultResponse(result, 204))
      .catch(err => errorReponse(err.message, 422));
  }
}

export default BooksController;
