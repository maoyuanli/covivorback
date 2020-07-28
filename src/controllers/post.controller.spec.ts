import request from 'supertest';
import {app} from "../app";


describe('post.controller', () => {
    it('should get all posts', async () => {
        const response = await request(app).get('/api/post/getall');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('posts')
    });
});
