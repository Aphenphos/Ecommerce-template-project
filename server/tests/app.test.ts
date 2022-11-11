// Note the mismatch of import name and library name. This follows the
// documentation example.
import request from 'supertest';
import app from '../app';
import {
  afterAll,
  afterEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import db from '../database.js';

describe('the server', () => {
  // Gracefully shut down the server, otherwise we see a warning from Jest.
  //
  // Due to issues described in
  // https://github.com/visionmedia/supertest/issues/697 Jest will display a
  // warning about how a worker process failed to exit. Jest is promise aware,
  // so returning promises will work properly. However supertest is not cleaning
  // up properly on promise returns. Using an afterAll with
  // Net.Server.prototype.close doesn't seem to do anything to help. Using it
  // with afterEach causes subsequent tests to fail. This issue has been at
  // large for about a year at time of writing, so it might need some external
  // contributions rather than waiting for the maintainer to get to it.
  // Additionaly there is a related issue
  // https://github.com/visionmedia/supertest/issues/634 with a pull request
  // tied to it https://github.com/visionmedia/supertest/pull/651 which has yet
  // to be merged.
  //
  // I have confirmed that the tests still fail properly if the expectations are
  // fouled up. So these aren't due to dangling promises that deceptively cause
  // tests to pass.
  afterAll((done) => {
    app.close(done);
  });

  it('successfully gets /foos', () => {
    return request(app)
      .get('/foos')
      .then((res) => expect(res.status).toBe(200));
  });

  it('serves a list of foos on GET /foos', () => {
    jest.spyOn(db, 'query').mockImplementation(
      jest.fn(() => {
        return Promise.resolve({
          rows: [{ foo: 'bar' }],
        });
      })
    );
    return request(app)
      .get('/foos')
      .then((res) => {
        expect(res.body).toEqual([{ foo: 'bar' }]);
      });
  });
});
