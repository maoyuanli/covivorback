import {Request, Response} from "express";
import axios from 'axios';

const covid19api: string = 'https://api.covid19api.com/total/country/canada';

export const fetchCovid19Data = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(covid19api);
        res.status(200).send(response.data)
    } catch (e) {
        console.log(e)
    }
};
