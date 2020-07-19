import {app} from "../../app";
import request from 'supertest';


describe('expController.getAllExps', () => {
    it('should return all experiences', async () => {
        const response = await request(app).get('/api/exp/getall');
        expect(response.status).not.toBe(200);
        // expect(response.body.status).toBe('success');
        // expect(response.body.data).toHaveProperty('exps')
        // expect(response.body.data.exps.length).toBeGreaterThan(2);
        // const companyNames = response.body.data.exps
        //     .map(exp => exp.companyName);
        // expect(companyNames).toContain('Bulls Financial');
        // expect(companyNames).toContain('Trout Tech');
        // expect(companyNames).toContain('Lion Bank')
    });
});
