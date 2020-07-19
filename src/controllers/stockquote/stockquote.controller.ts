import {Request, Response} from "express";
import axios from 'axios';
import {provideConfig} from "../../config/keys";

export const provideDateRange = (daysAgo: number): DateRange => {
    const today = Date.now();
    const start = new Date(today - (daysAgo * 24 * 60 * 60 * 1000));
    const end = new Date(today);
    const formattedEnd = end.toISOString().split('T')[0];
    const formattedStart = start.toISOString().split('T')[0];
    return {startDate: formattedStart, endDate: formattedEnd};
};

export interface DateRange {
    startDate: string;
    endDate: string;
}

const quandlKey: string = provideConfig().quandlKey;
const dateRange: DateRange = provideDateRange(90);
const startDate: string = dateRange.startDate;
const endDate: string = dateRange.endDate;
const tickers: string[] = ["ABN", "ADYEN", "INGA", "KPN", "RDSA", "BNP"];

export const provideStockQuote = async (req: Request, res: Response) => {
    const url: string =
        `https://www.quandl.com/api/v3/datasets/EURONEXT/<ticker>.json?api_key=${quandlKey}&start_date=${startDate}&end_date=${endDate}`;
    try {
        const quotesArray: string[] = [];
        for (let ticker of tickers) {
            const fullUrl = url.replace('<ticker>', ticker);
            const response = await axios.get(fullUrl);
            quotesArray.push(response.data)
        }
        res.status(200).json({
            quotes: quotesArray
        })
    } catch (e) {
        console.log(e)
    }
};
