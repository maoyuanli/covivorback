import {Router} from "express";
import {getOrder, setOrder} from "../controllers/order/order.controller";
import {auth} from "../utils/auth";

export const setOrderRouter = Router();

setOrderRouter.route('/').post(auth, setOrder);

export const getOrderRouter = Router();

getOrderRouter.route('/').get(auth, getOrder);
