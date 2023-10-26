import { Request, Response } from "express";
import { ITask } from "../interfaces/ITask";
import TaskService from "../services/TaskService";
import { StatusCodes } from "http-status-codes";
import { UserOmitPassword } from "../interfaces/IUser";
import { INewRequest } from "../interfaces";

export default class TaskController {

  constructor(private _service: TaskService) {}

  public async create(req: INewRequest, res: Response<ITask>) {
    const taskCreated = await this._service.create(req.body, req.user?.userId);
    return res.status(StatusCodes.CREATED).json(taskCreated);
  }

  public async find(req: Request & { user?: UserOmitPassword }, res: Response<ITask[]>) {
    const tasks = await this._service.find(req.user?.userId);
    return res.status(StatusCodes.OK).json(tasks);
  }

  public async update(req: INewRequest, res: Response<ITask>) {

    const taskUpdated = await this._service.update({
      ...req.body,
      id: req.params.id
    });
    return res.status(StatusCodes.OK).json(taskUpdated);
  }

  public async delete(req: INewRequest & { params: { id: string } }, res: Response) {
    console.log(req.params);
    await this._service.delete(req.params.id);
    return res.status(StatusCodes.OK).json({ res: "Deletado com sucesso!" });
  }

}