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

// interface ITaskBack { 
//   // userId: string | undefined; 
//   // id?: string | undefined; 
//   // title: string; 
//   // details: string; 
//   // isDone: boolean; 
//   // _id: string; 
// }

// // userId?: string | undefined;
// // id?: string | undefined;
// // title: string;
// // details: string;
// // isDone: boolean;

export default class TaskModel {
  
  constructor(private _model = mongooseCreateModel('Task', taskMongooseSchema)) {}

  public async create(obj: ITask, id?: string): Promise<ITask & { _id: string }> {
    const task = await this._model.create({
      ...obj, userId: id,
    });

    const taskMapped = {
      ...obj,
      _id: task._id.toString()
    }
    return taskMapped;
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