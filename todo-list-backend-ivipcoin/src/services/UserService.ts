import { StatusCodes } from "http-status-codes";
import { errorMessage } from "../helpers/generateError";
import generateJWT from "../helpers/generateJWT";
import { IErrorHandler } from "../interfaces/IErrorHandler";
import { IUser, IUserWithToken, TokenJWT, UserZodSchema } from "../interfaces/IUser";
import UserModel from "../models/UserModel";
import { compareHash, generateHash } from "../helpers/handlerHash";


export default class UserService {

  private _user: UserModel;
  
  constructor(model: UserModel) {
    this._user = model;
  }

  public async create(user: IUser): Promise<IUserWithToken> { 
    const parsedToUser = UserZodSchema.safeParse(user);
    
    if(!parsedToUser.success) {
      throw parsedToUser.error;
    }

    const userExists = await this._user.findUser(user);

    if(userExists && await compareHash(user.password, userExists.password)) {
      throw errorMessage(StatusCodes.CONFLICT, "User already exists!");
    }

    const passwordHash = await generateHash(user.password);
    const userCreated = await this._user.create({ 
      username: user.username, 
      password: passwordHash,
    });

    return {
      user: userCreated,
      token: generateJWT(user),
    };
  }

  public async login(user: IUser): Promise<TokenJWT | IErrorHandler> { 
    const parsedToUser = UserZodSchema.safeParse(user);
    if(!parsedToUser.success) {
      throw parsedToUser.error;
    }

    const userExists = await this._user.findUser(user);
    if(userExists === null) {
      throw errorMessage(StatusCodes.NOT_FOUND, "User not found!");
    }

    const isSamePassword = await compareHash(user.password, userExists.password);
    if(!isSamePassword) {
      throw errorMessage(StatusCodes.CONFLICT, "Invalid password!");
    }

    return { token: generateJWT(user) };
  }
}