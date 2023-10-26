export interface IUser {
  email: string
  password: string
  _id: string
}

export interface IUserWithToken {
  user: IUser
  token: string
}

export interface IErrorHandler extends Error {
	status: number;
}

export type TokenJWT = Pick<IUserWithToken, 'token' >;
