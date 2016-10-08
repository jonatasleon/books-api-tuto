import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list of books', () => {
      const Books = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-10-08T19:03:02.923Z',
        updated_at: '2016-10-08T19:03:02.923Z',
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a specific book: getById()', () => {
    it('should return a book', () => {
      const Books = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2016-10-08T19:03:02.923Z',
        updated_at: '2016-10-08T19:03:02.923Z',
      };

      td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getById(1)
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a book: create()', () => {
    it('should create a book', () => {
      const Books = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Test Book',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book',
        created_at: '2016-10-08T19:03:02.923Z',
        updated_at: '2016-10-08T19:03:02.923Z',
      };

      td.when(Books.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a book: update()', () => {
    it('should update an existing book', () => {
      const Books = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Test Book Updated',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Book Updated',
        created_at: '2016-10-08T19:03:02.923Z',
        updated_at: '2016-10-08T19:53:25.747Z',
      };

      td.when(Books.update(requestBody, { where: { id: 1 } }))
        .thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.update(requestBody, 1)
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a book: update()', () => {
    it('should delete a book', () => {
      const Books = {
        destroy: td.function(),
      };

      td.when(Books.destroy({ where: { id: 1 } })).thenResolve({});

      const booksController = new BooksController(Books);
      return booksController.delete(1)
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
