import HttpStatus from 'http-status';

describe('Routes Users', () => {
  const Users = app.datasource.models.Users;
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'default@mail.com',
    password: 'test',
  };

  beforeEach((done) => {
    Users.destroy({ where: {} })
      .then(() => Users.create(defaultUser))
      .then(() => {
        done();
      });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request.get('/users')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultUser.id);
          expect(res.body[0].name).to.be.eql(defaultUser.name);
          expect(res.body[0].email).to.be.eql(defaultUser.email);

          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a specific user', (done) => {
      request.get('/users/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultUser.id);
          expect(res.body.name).to.be.eql(defaultUser.name);
          expect(res.body.email).to.be.eql(defaultUser.email);

          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'New user',
        email: 'newEmail@mail.com',
        password: 'newTest',
      };

      request.post('/users')
        .send(newUser)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newUser.id);
          expect(res.body.name).to.be.eql(newUser.name);
          expect(res.body.email).to.be.eql(newUser.email);

          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'Updated user',
        email: 'update@mail.com',
        password: 'updatedTest',
      };

      request.put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);

          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request.delete('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(HttpStatus.NO_CONTENT);

          done(err);
        });
    });
  });
});
