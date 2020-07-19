import {updateSkill} from "./skill.controller";
import {Skill} from "../../models/skill.model";
import {app} from "../../app";
import request from 'supertest';
import {createRequest, createResponse} from "node-mocks-http";

Skill.findOneAndUpdate = jest.fn();

let req;
let res;
let mockReqPayload;

beforeEach(() => {
    req = createRequest();
    res = createResponse();
});

describe('skillController.updateSkill', () => {
    beforeEach(() => {
        mockReqPayload = {
            skillName: 'python',
            score: 5
        };
        req.body = mockReqPayload;
    });

    it('should parse correct params to findOneAndUpdate function', () => {
        updateSkill(req, res);
        expect(Skill.findOneAndUpdate).toBeCalledWith(
            {skillName: mockReqPayload.skillName},
            {score: mockReqPayload.score},
            {new: true, upsert: true, runValidators: true}
        );
    });

    it("should return res status of 201", () => {
        updateSkill(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("should return json response", async () => {
        const mockMongoRes = {
            "_id": "5ed7f45427b44edcdc4e4968",
            "skillName": mockReqPayload.skillName,
            "__v": 0,
            "score": mockReqPayload.score
        };
        // @ts-ignore
        Skill.findOneAndUpdate.mockReturnValue(mockMongoRes);
        const expectedRes = {
            "status": "success",
            "data": {
                "skill": mockMongoRes
            }
        };
        await updateSkill(req, res);
        expect(res._getJSONData()).toStrictEqual(expectedRes);
    })
});

describe('skillController.getAllSkills', () => {
    jest.setTimeout(30000); // 30 seconds
    it('should return init skills', async () => {
        const response = await request(app).get('/api/skill/getall');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('skills');
        // expect(response.body.data.skills.length).toBeGreaterThan(6);
        // const skillNames = response.body.data.skills.map(skill => skill.skillName);
        // expect(skillNames).toContain('java');
        // expect(skillNames).toContain('javascript');
        // expect(skillNames).toContain('python')
    })
});
