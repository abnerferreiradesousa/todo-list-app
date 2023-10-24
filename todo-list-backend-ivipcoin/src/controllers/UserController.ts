import { Request, Response } from "express";
import { IService } from "../interfaces/IService";
import { IUser, IUserWithToken } from "../interfaces/IUser";

export default class UserController {
  constructor(private _service: IService<IUser>) {}

  public async create(req: Request & { body: IUser }, res: Response<IUser>) {
    const userCreated = await this._service.create(req.body);
    return res.status(201).json(userCreated);
  }

}