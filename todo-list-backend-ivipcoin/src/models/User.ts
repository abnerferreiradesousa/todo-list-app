import { model as mongooseCreateModel, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";
import MongoModel from "./MongoModel";


const userMongooseSchema = new Schema<IUser>({
  firstName: String,
  secondName: String,
}, {
  versionKey: false
});

export default class User extends MongoModel<IUser> {
  constructor(model = mongooseCreateModel('User', userMongooseSchema)) {
    super(model);
  }
}