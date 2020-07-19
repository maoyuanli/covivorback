import {Request, Response} from 'express'
import jwt from 'jsonwebtoken';
import {provideConfig} from "../config/keys";

export const auth = (req: Request, res: Response, next) => {
    const authWithBearer = req.header('Authorization');
    // @ts-ignore
    const token = authWithBearer.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: 'authentication failed',
            message: 'no token provided'
        });
    }
    try {
        // @ts-ignore
        req.user = jwt.verify(token, provideConfig().jwtPrivateToken);
        next();
    } catch (e) {
        res.status(400).json({
            status: 'login failed'
        })
    }
};
