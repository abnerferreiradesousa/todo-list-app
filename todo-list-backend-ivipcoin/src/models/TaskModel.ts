import { model as mongooseCreateModel, Schema } from "mongoose";
import { ITask } from "../interfaces/ITask";


const taskMongooseSchema = new Schema<ITask>({
  title: String,
  details: String,
  isDone: Boolean,
}, {
  versionKey: false
});

export default class TaskModel {
  constructor(private _model = mongooseCreateModel('Task', taskMongooseSchema)) {}

  public async create(obj: ITask): Promise<ITask> {
    return this._model.create(obj);
  }
}