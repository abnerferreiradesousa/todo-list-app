import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/IUser';

export type User= Omit<IUser, 'password'>;

const generateJWT = (payload: User): string => {
	const token = jwt.sign(
		{data: payload},
		process.env.JWT_SECRET = 'hulkEsmaga',
		{expiresIn: '1d'});
	return token;
};

export default generateJWT;