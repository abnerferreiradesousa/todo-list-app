import { model as mongooseCreateModel, Schema, Types } from "mongoose";
import { IUser, UserObjectId } from "../interfaces/IUser";

const userMongooseSchema = new Schema<IUser>({
  email: String,
  password: String,
}, {
  versionKey: false
});

export default class UserModel {

  constructor(private _model = mongooseCreateModel('User', userMongooseSchema)) {}

  public async create(obj: IUser): Promise<UserObjectId> {
    return this._model.create(obj);
  }

  public async findUser({email}: IUser): Promise<UserObjectId | null> {
    return this._model.findOne({ email });
  }
}
