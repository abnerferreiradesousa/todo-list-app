import { IErrorHandler } from "../interfaces/IErrorHandler";

export const errorMessage = (status: number, message: string): IErrorHandler => ({
	name: 'Error',
	status,
	message,
});