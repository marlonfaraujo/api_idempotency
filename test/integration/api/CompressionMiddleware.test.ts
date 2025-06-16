import request from 'supertest';
import zlib from 'zlib';
import ExpressAdapter from '../../../src/api/ExpressAdapter';
import HealthCheck from '../../../src/api/features/HealthCheck';
import axios from 'axios';

describe('Compression Middleware', () => {
  const httpServer = new ExpressAdapter();
  const healthCheck = new HealthCheck(httpServer);
  healthCheck.config();
  
  it('should compress the response with gzip when requested', async () => {
    const response = await axios.get('http://localhost:3000/test', {
      headers: {
        'Accept-Encoding': 'gzip'
      },
      responseType: 'arraybuffer',
      decompress: false
    });

    const decompressed = zlib.gunzipSync(response.data).toString();

    expect(response.headers['content-encoding']).toBe('gzip');
    expect(decompressed).toContain('x');
    expect(decompressed.length).toBeGreaterThan(1000);
  });

  it('should respond without compression if not requested', async () => {
    const response = await request(httpServer.getInstance())
      .get('/test')
      .set('x-no-compression', '*')
      .expect(200);

    expect(response.headers['content-encoding']).toBeUndefined();
    expect(response.text.length).toBeGreaterThan(1000);
    expect(response.text).toContain('x');
  });
});
