import { NextFunction, Request, Response } from "express";
import { UserOmitPassword } from "../interfaces/IUser";
import { errorMessage } from "../helpers/generateError";
import jwt from 'jsonwebtoken';


export const authToken = (req: Request & { user?: UserOmitPassword }, res: Response, next: NextFunction) => {
	try {
		const {authorization} = req.headers;
		if (!authorization) {
			return res.status(401).json({message: 'TOKEN_NOT_FOUND'});
		}

		const tokenIsValid = jwt.verify(
			authorization,
			process.env.JWT_SECRET = 'hulkEsmaga',
		) as jwt.JwtPayload;

		req.user = tokenIsValid.data;
		next();
	} catch (error) {
		next(errorMessage(401, 'Token must be a valid token'));
	}
};