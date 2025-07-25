import request from 'supertest';
import app from '../app'

describe('Users API', () => {
  it('should get users', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);
    
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a user', async () => {
    const newUser = { name: 'John', email: 'john@test.com' };
    
    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201);
    
    expect(response.body).toMatchObject(newUser);
  });
});