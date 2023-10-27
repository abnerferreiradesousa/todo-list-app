import jwt from 'jsonwebtoken';
import { UserOmitPassword } from '../interfaces/IUser';


const generateJWT = (payload: UserOmitPassword): string => {
	const token = jwt.sign(
		{data: { email: payload.email, userId: payload.userId }},
		process.env.JWT_SECRET = 'hulkEsmaga',
		{expiresIn: '1d'}
		);
	return token;
};

export default generateJWT;