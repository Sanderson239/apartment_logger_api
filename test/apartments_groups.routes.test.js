'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../index');
const { addDatabaseHooks } = require('./utils')
suite('apartments_groups routes', addDatabaseHooks(() => {
  suite('with login',addDatabaseHooks(() => {
    const agent = request.agent(server);

    // beforeEach((done) => {
    //   agent
    //     .post('/login')
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    //     .send({
    //       username: 'coffeeAdmin',
    //       password: 'gotjitters',
    //     })
    //     .end((err, res) => {
    //       if (err) {
    //         return done(err);
    //       }
    //       done();
    //     });
    // });

    test('GET /apartments_groups/:id', (done) => {
      request(server)
        .get('/apartments_groups/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, [
          {
          apartmentId: 2,
          apartmentName: 'home',
          street: 'fsdafa',
          city: 'SF',
          state: 'CA',
          country: 'USA',
          zip: '1321',
          latitude: '32132',
          longitude: '3213',
          landlordId: 2,
          sqrFootage: 12321,
          bedrooms: 3213,
          bathrooms:986546,
          beds: 32132,
          apartmentDescription: 'great place to live',
          aptUrl: 'something.com',
          createdAt: '2017-05-14T12:23:00.000Z',
          updatedAt: '2017-05-14T12:23:00.000Z',
          apartmentsGroupsId: 1,
          groupId: 1,
          userId: 1,
        }
        ], done);
    });
}));

    // test('POST /apartments_groups', (done) => {
    //   agent
    //     .post('/apartments_groups')
    //     .set('Accept', 'application/json')
    //     .set('Content-Type', 'application/json')
    //     .send({ userId: 1, coffeeId: 2 })
    //     .expect('Content-Type', /json/)
    //     .expect((res) => {
    //       delete res.body.createdAt;
    //       delete res.body.updatedAt;
    //     })
    //     .expect(200, {
    //       id: 3,
    //       coffeeId: 2,
    //       userId: 1 }, done);
    // });

  //   test('DELETE /apartments_groups/:id', (done) => {
  //   agent
  //     .del('/apartments_groups/2')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(200, [{
  //       id: 2,
  //       coffeeId: 1,
  //       userId: 1,
  //       createdAt: '2017-06-23T14:56:16.000Z',
  //       updatedAt: '2017-06-23T14:56:16.000Z'
  //     }], done);
  //   });
  // }));
  /* eslint-enable max-len */

}));
