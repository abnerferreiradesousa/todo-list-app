import { Request, Response } from "express";
import { IService } from "../interfaces/IService";
import { ITask } from "../interfaces/ITask";

export default class TaskController {
  constructor(private _service: IService<ITask>) {}

  public async create(req: Request & { body: ITask }, res: Response<ITask>) {
    const taskCreated = await this._service.create(req.body);
    return res.status(201).json(taskCreated);
  }

  public async read(req: Request & { body: ITask }, res: Response<ITask[]>) {
    const taskCreated = await this._service.read();
    return res.status(200).json(taskCreated);
  }

}