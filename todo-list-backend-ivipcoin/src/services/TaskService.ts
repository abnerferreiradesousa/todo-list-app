import { StatusCodes } from "http-status-codes";
import { ITask, TaskZodSchema } from "../interfaces/ITask";
import TaskModel from "../models/TaskModel";
import { errorMessage } from "../helpers/generateError";
import { Types } from "mongoose";


export default class TaskService {
  
  constructor(private _task: TaskModel) {}

  public async create(task: ITask, id?: string): Promise<ITask & { _id: Types.ObjectId }> { 
    const parsedToTask = TaskZodSchema.safeParse(task);
    if(!parsedToTask.success) {
      throw parsedToTask.error;
    }

    return this._task.create(task, id);
  }

  public async find(id?: string): Promise<ITask[]> {  
    return this._task.find(id);
  }

  public async update(task: ITask): Promise<ITask> { 
    const taskUpdate = await this._task.update(task);
    if(taskUpdate === null) {
      throw errorMessage(StatusCodes.NOT_FOUND, "Tarefa não encontrada!");
    }

    return taskUpdate;
  }

  public async delete(id: string) {
    await this._task.delete(id);
  }
}