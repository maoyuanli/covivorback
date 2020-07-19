import {Request, Response} from "express";
import axios from 'axios';
import {provideConfig} from "../../config/keys";

const newsApiKey = provideConfig().newsApiKey;

export const provideTopNews = async (req: Request, res: Response) => {
    const url: string =
        `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`;
    try {
        const response = await axios.get(url);
        res.status(200).send(response.data)
    } catch (e) {
        console.log(e)
    }
};

export const searchNews = async (req: Request, res: Response) => {
    const url: string =
        `https://newsapi.org/v2/everything?q=${req.query.q}&apiKey=${newsApiKey}`;
    try {
        const response = await axios.get(url);
        res.status(200).send(response.data)
    } catch (e) {
        console.log(e)
    }
};
