import { Request, Response } from "express";
import { IUser, IUserWithToken, TokenJWT } from "../interfaces/IUser";
import UserService from "../services/UserService";
import { StatusCodes } from "http-status-codes";

export default class UserController {
  
  constructor(private _service: UserService) {}

  public async create(req: Request & { body: IUser }, res: Response<IUserWithToken>) {
    const userCreated = await this._service.create(req.body);
    return res.status(StatusCodes.CREATED).json(userCreated);
  }

  public async login(req: Request & { body: IUser }, res: Response<TokenJWT>) {
    const token = await this._service.login(req.body);
    return res.status(StatusCodes.OK).json(token);
  }
}