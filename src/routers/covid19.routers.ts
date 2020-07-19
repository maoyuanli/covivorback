import express from 'express';
import {fetchCovid19Data} from "../controllers/covid19/covid19.controller";

export const covid19Router = express.Router();

covid19Router.route('/').get(fetchCovid19Data);
