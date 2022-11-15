// Note the mismatch of import name and library name. This follows the
// documentation example.
import request, { agent } from 'supertest';
import app from '../app';
import {
  afterAll,
  afterEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { CookieAccessInfo } from 'cookiejar';
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
  const mockUser = {
    email: 'test@example.com',
    password: 'P@ssw0rd!',
  };

  it('Creates and signs in a user.', async () => {
    const agent = request.agent(app);
    const res = await agent.post('/api/v1/users/').send(mockUser);
    expect(res.body).toEqual({
      email: mockUser.email,
      password: mockUser.password,
    });
    const session = agent.jar.getCookie(
      'cookie',
      CookieAccessInfo.All
    );
    expect(session).toBeTruthy();
  });

  it('returns the current user', async () => {
    const agent = request.agent(app);
    const me = await agent.get('/api/v1/users/me');
    expect(me.body).toEqual({
      email: expect.any(String),
      id: expect.any(String),
      exp: expect.any(Number),
      iat: expect.any(Number),
    });
  });

  it('/get returns a 401 if not logged in', async () => {
    const resp = await request(app).get('/api/v1/users/me');
    expect(resp.status).toBe(401);
  });

  it('delete user session(logout)', async () => {
    const agent = request.agent(app);
    await agent.post('/api/v1/users/sessions').send(mockUser);
    const resp = await agent.delete('/api/v1/users/sessions');
    expect(resp.status).toBe(204);
  });
});
