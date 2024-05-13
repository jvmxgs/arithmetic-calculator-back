import request from 'supertest'
import app from '../src/app'

describe('GET /books', () => {
  it('should return a JSON with books', async () => {

    const response = await request(app).get('/books')

    expect(response.status).toBe(200)
  })
})
