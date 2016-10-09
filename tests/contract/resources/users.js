describe('Routes Users', () => {
  const Users = app.datasource.models.Users;
  const defaultUser = {
    id: 1,
    name: 'Default User',
    email: 'default@mail.com',
    password: 'default',
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
      const usersList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request.get('/users')
        .end((err, res) => {
          joiAssert(res.body, usersList);
          done(err);
        });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a specific user', (done) => {
      const user = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request.get('/users/1')
        .end((err, res) => {
          joiAssert(res.body, user);
          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newUser = {
        id: 2,
        name: 'New user',
        email: 'new@mail.com',
        password: 'newPass',
      };

      const user = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request.post('/users')
        .send(newUser)
        .end((err, res) => {
          joiAssert(res.body, user);
          done(err);
        });
    });
  });

  describe('Route PUT /users/{id}', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'Updated user',
        email: 'updated@mail.com',
        password: 'updated',
      };

      const updatedCount = Joi.array().items(1);

      request.put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /users/{id}', () => {
    it('should delete a user', (done) => {
      request.delete('/users/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
