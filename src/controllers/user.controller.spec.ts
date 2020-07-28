import request from 'supertest';
import {app} from "../app";


describe('user.controller', () => {
    it('should log in', async () => {
        const user1 = request.agent(app);
        user1.post('/user/login')
            .send({username: 'guest@account.com', password: 'abc123'})
            .expect(200).end(((err, res1) => {
            expect(res1).toHaveProperty('token')
        }))
    });
});
