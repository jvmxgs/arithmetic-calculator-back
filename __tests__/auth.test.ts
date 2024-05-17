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

    const userData = {
      email: 'admin@example.com',
    };

    const secretKey = appConfig.key

    const token = jwt.sign(userData, secretKey)

    const response = await request(app)
      .post('/api/v1/addition')
      .set('Authorization', 'Bearer ' + token)
      .send({
        first_number: '500',
        second_number: '7'
      });

    console.log(response.body)

    expect(response.status).toBe(200)
  }); */
});
