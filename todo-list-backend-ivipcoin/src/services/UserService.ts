import { StatusCodes } from "http-status-codes";
import { errorMessage } from "../helpers/generateError";
import generateJWT from "../helpers/generateJWT";
import { IUser, IUserWithToken, TokenJWT, UserZodSchema } from "../interfaces/IUser";
import UserModel from "../models/UserModel";
import { compareHash, generateHash } from "../helpers/handlerHash";


export default class UserService {

  constructor(private _user: UserModel) { }

  public async create(user: IUser): Promise<IUserWithToken> {
    const parsedToUser = UserZodSchema.safeParse(user);

    if (!parsedToUser.success) {
      throw parsedToUser.error;
    }

    const userExists = await this._user.findUser(user);
    if (userExists) {
      throw errorMessage(StatusCodes.CONFLICT, "Usuário já existente!");
    }

    const passwordHash = await generateHash(user.password);
    const userCreated = await this._user.create({
      email: user.email,
      password: passwordHash,
    });

    const token = generateJWT({
      email: userCreated.email,
      userId: userCreated._id.toString()
    });

    const userData = {
      user: {
        email: userCreated.email,
        password: userCreated.password,
        userId: userCreated._id.toString()
      },
      token
    };

    return userData;
  }

  public async login(user: IUser): Promise<TokenJWT> {
    const parsedToUser = UserZodSchema.safeParse(user);
    if (!parsedToUser.success) {
      throw parsedToUser.error;
    }

    const userExists = await this._user.findUser(user);
    if (userExists === null) {
      throw errorMessage(StatusCodes.NOT_FOUND, "Usuário não encontrado!");
    }

    const isSamePassword = await compareHash(user.password, userExists.password);
    if (!isSamePassword) {
      throw errorMessage(StatusCodes.CONFLICT, "Senha não correspondente!");
    }

    const token = generateJWT({
      email: userExists.email,
      userId: userExists._id.toString()
    });

    return { token };
  }
}