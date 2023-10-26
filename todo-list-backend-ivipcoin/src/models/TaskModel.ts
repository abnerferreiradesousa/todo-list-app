import { model as mongooseCreateModel, Schema, Types } from "mongoose";
import { ITask } from "../interfaces/ITask";


const taskMongooseSchema = new Schema<ITask>({
  title: String,
  details: String,
  isDone: Boolean,
  userId: String,
}, {
  versionKey: false
});

export default class TaskModel {
  
  constructor(private _model = mongooseCreateModel('Task', taskMongooseSchema)) {}

  public async create(obj: ITask, id?: string): Promise<ITask & { _id: Types.ObjectId }> {
    return this._model.create({
      ...obj, userId: id
    });
  }

  public async find(id?: string): Promise<ITask[]> {
    return this._model.find({ userId: id });
  }

  public async update({ id, title, details, isDone }: ITask): Promise<ITask | null> {

    return this._model.findOneAndUpdate(
      { _id: id },
      { title, details, isDone }, 
      { new: true }
    );
  } 

  public async delete(id: string) {
    await this._model.findByIdAndDelete({ _id: id });
  }

}