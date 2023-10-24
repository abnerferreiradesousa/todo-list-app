import { IModel } from "../interfaces/IModel";
import { IService } from "../interfaces/IService";
import { IUser, IUserWithToken, UserZodSchema } from "../interfaces/IUser";


export default class TaskService implements IService<IUser> {

  private _user: IModel<IUser>;
  
  constructor(model: IModel<IUser>) {
    this._user = model;
  }

  public async create(obj: IUser): Promise<IUser> { 
    const parsedToUser = UserZodSchema.safeParse(obj);
    
    if(!parsedToUser.success) {
      throw parsedToUser.error;
    }

    return this._user.create(obj);
  }

}