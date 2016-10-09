import HttpStatus from 'http-status';
import UsersController from '../../../controllers/users';

describe('Controllers: Users', () => {
  describe('Get all users: getAll()', () => {
    it('should return a list of users', () => {
      const Users = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test User',
        created_at: '2016-10-08T19:03:02.923Z',
        updated_at: '2016-10-08T19:03:02.923Z',
      }];

      td.when(Users.findAll({})).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a specific user: getById()', () => {
    it('should return a user', () => {
      const Users = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Test User',
        created_at: '2016-10-08T19:03:02.923Z',
        updated_at: '2016-10-08T19:03:02.923Z',
      };

      td.when(Users.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.getById(1)
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a user: create()', () => {
    it('should create a user', () => {
      const Users = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Test User',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test User',
        created_at: '2016-10-08T19:03:02.923Z',
        updated_at: '2016-10-08T19:03:02.923Z',
      };

      td.when(Users.create(requestBody)).thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(HttpStatus.CREATED);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a user: update()', () => {
    it('should update an existing user', () => {
      const Users = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Test User Updated',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test User Updated',
        created_at: '2016-10-08T19:03:02.923Z',
        updated_at: '2016-10-08T19:53:25.747Z',
      };

      td.when(Users.update(requestBody, { where: { id: 1 } }))
        .thenResolve(expectedResponse);

      const usersController = new UsersController(Users);
      return usersController.update(requestBody, 1)
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a user: update()', () => {
    it('should delete a user', () => {
      const Users = {
        destroy: td.function(),
      };

      td.when(Users.destroy({ where: { id: 1 } })).thenResolve({});

      const usersController = new UsersController(Users);
      return usersController.delete(1)
        .then(response => expect(response.statusCode).to.be.eql(HttpStatus.NO_CONTENT));
    });
  });
});
