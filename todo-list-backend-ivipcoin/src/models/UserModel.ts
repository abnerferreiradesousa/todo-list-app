import { model as mongooseCreateModel, Schema } from "mongoose";
import { IUser } from "../interfaces/IUser";

const userMongooseSchema = new Schema<IUser>({
  username: String,
  password: String,
}, {
  versionKey: false
});

export default class UserModel {

  constructor(private _model = mongooseCreateModel('User', userMongooseSchema)) {}

  public async create(obj: IUser): Promise<IUser> {
    return this._model.create(obj);
  }

  public async findUser({username}: IUser): Promise<IUser | null> {
    return this._model.findOne({ username });
  }
}
