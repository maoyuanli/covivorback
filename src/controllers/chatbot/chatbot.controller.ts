import {provideConfig} from "../../config/keys";
import {Request, Response} from "express";
import dialogflow from 'dialogflow';

const projectID = provideConfig().gootleProjectID;
const credentials = {
    client_email: provideConfig().googleClientEmail,
    private_key: provideConfig().googlePrivateKey
};
const sessionClient = new dialogflow.SessionsClient({projectID, credentials});
const sessionPath = sessionClient.sessionPath(provideConfig().gootleProjectID, provideConfig().dialogFlowSessionID);


export const handleTextQuery = async (req: Request, res: Response) => {
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.text,
                languageCode: provideConfig().dialogFlowSessionLanguageCode,
            },
        },
    };
    const responses = await sessionClient.detectIntent(request);
    res.send(responses[0].queryResult);
};

export const handleEventQuery = async (event: any, res: Response) => {
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                name: event,
                languageCode: provideConfig().dialogFlowSessionLanguageCode,
            },
        },
    };
    try {
        const responses = await sessionClient.detectIntent(request);
        res.send(responses[0].queryResult);
    } catch (err) {
        res.status(400).json({
            status: 'something wrong with chatbot',
            message: err
        })
    }

};

module.exports = {handleTextQuery, handleEventQuery};
