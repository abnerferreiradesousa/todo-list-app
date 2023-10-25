import { Request } from "express";
import { ITask } from "./ITask";
import { UserOmitPassword } from "./IUser";

export interface INewRequest extends Request {
  body: ITask, 
  user?: UserOmitPassword
}