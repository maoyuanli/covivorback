import {Router} from "express";

import {handleFeedback} from "../controllers/feedback/feedback.controller";

export const feedbackRouter = Router();

feedbackRouter.route('/')
    .post(handleFeedback);
