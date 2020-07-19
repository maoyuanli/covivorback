import {handleTextQuery} from "./chatbot.controller";
import {createRequest, createResponse} from "node-mocks-http";

let req;
let res;

beforeEach(() => {
    req = createRequest();
    res = createResponse();
});

describe('chatbot controller handleTextQuery', () => {
    it('should return fulfillmentText', async () => {
        req.body = {
            text: 'hi'
        };
        await handleTextQuery(req, res);
        const dfResponse = res._getData();
        expect(dfResponse.fulfillmentText.length).toBeGreaterThan(0);
        expect(dfResponse.allRequiredParamsPresent).toBe(true);
        expect(dfResponse.queryText).toBe('hi');
    });
});
