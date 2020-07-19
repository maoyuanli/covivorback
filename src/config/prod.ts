import {Config} from "./keys";

export const prodConfig: Config = {
    TwitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
    TwitterConsumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    TwitterAccessTokenKey: process.env.TWITTER_ACCESS_TOKEN_KEY,
    TwitterAccessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    quandlKey: process.env.QUANDL_KEY,
    newsApiKey: process.env.NEWS_API_KEY,
    jwtPrivateToken: process.env.JWT_PRIVATE_TOKEN,
    mongoDBConnStr: process.env.DATABASE,
    mongoDBPassword: process.env.DB_PASS,
    gootleProjectID: process.env.GOOGLE_PROJECT_ID,
    dialogFlowSessionID: process.env.DIALOGFLOW_SESSION_ID,
    dialogFlowSessionLanguageCode: 'en-US',
    googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    googlePrivateKey: process.env.GOOGLE_PRIVATE_KEY
};
