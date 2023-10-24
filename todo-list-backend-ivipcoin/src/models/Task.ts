import { model as mongooseCreateModel, Schema } from "mongoose";
import { ITask } from "../interfaces/ITask";
import MongoModel from "./MongoModel";


const taskMongooseSchema = new Schema<ITask>({
  title: String,
  details: String,
  isDone: Boolean
}, {
  versionKey: false
});

export default class Task extends MongoModel<ITask> {
  constructor(model = mongooseCreateModel('Task', taskMongooseSchema)) {
    super(model);
  }
}