import { Request, Response } from "express";
import { IUser, IUserWithToken, TokenJWT } from "../interfaces/IUser";
import UserService from "../services/UserService";
import { IErrorHandler } from "../interfaces/IErrorHandler";

export default class UserController {
  constructor(private _service: UserService) {}

  public async create(req: Request & { body: IUser }, res: Response<IUserWithToken>) {
    const userCreated = await this._service.create(req.body);
    return res.status(201).json(userCreated);
  }

  public async login(req: Request & { body: IUser }, res: Response<TokenJWT | IErrorHandler>) {
    const userCreated = await this._service.login(req.body);
    return res.status(201).json(userCreated);
  }
}