import { IModel } from "../interfaces/IModel";
import { IService } from "../interfaces/IService";
import { ITask, TaskZodSchema } from "../interfaces/ITask";


export default class TaskService implements IService<ITask> {

  private _task: IModel<ITask>;
  
  constructor(model: IModel<ITask>) {
    this._task = model;
  }

  public async create(obj: ITask): Promise<ITask> { 
    const parsedToTask = TaskZodSchema.safeParse(obj);
    
    if(!parsedToTask.success) {
      throw parsedToTask.error;
    }

    return this._task.create(obj);
  }

}