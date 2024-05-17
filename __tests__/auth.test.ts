import request from 'supertest';
import app from '../src/app';

describe('Test /api/v1/addition endpoint', () => {
  it('Should return 401 error if authentication token is not given', async () => {
    const response = await request(app)
      .post('/api/v1/addition')
      .send({
        first_number: '500',
        second_number: '7'
      });

    expect(response.status).toBe(401);
  });

  it('Should return 401 error if authentication token is invalid', async () => {
    const response = await request(app)
      .post('/api/v1/addition')
      .set('Authorization', 'Bearer token_invalido')
      .send({
        first_number: '500',
        second_number: '7'
      });

    expect(response.status).toBe(401);
  });

  /* it('Should return 200 status code if the authentication token provided is valid', async () => {
    const response = await request(app)
      .post('/api/v1/addition')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzE1OTc0ODU2LCJleHAiOjE3MTU5Nzg0NTZ9.6i1RxvOCXuRrxmrJ69N8RzTonXx_TKn_oZ7Tp-eloGA')
      .send({
        first_number: '500',
        second_number: '7'
      });

    expect(response.status).toBe(200);
  }); */
});
