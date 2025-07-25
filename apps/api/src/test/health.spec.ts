import request from 'supertest';
import app from '../app';

describe('Health Check', () => {
  it('should return healthy status', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);
    
    expect(response.body).toEqual({ status: 'OK' });
  });
});