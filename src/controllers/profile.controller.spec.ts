import request from 'supertest';
import {app} from "../app";


describe('profile.controller', () => {
    it('should get all profiles', async () => {
        const response = await request(app).get('/api/profile/getall');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('profiles')
    });
});
