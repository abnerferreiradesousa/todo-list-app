import { Types } from 'mongoose';
import { z } from 'zod';

const UserZodSchema = z.object({
  email: z.string({ invalid_type_error: "Deve ser um email!" })
    .email({ message: 'Email inválido!' }),
  password: z.string({ invalid_type_error: "Senha deve ser um texto!" })
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres!" }),
});

type IUser = z.infer<typeof UserZodSchema>;

interface IUserWithToken {
  user: IUser & { userId: string }
  token: string
}

type TokenJWT = Pick<IUserWithToken, 'token' >;
type UserObjectId = IUser & { _id: Types.ObjectId }
type UserStrId = IUser & { userId: string }
type UserOmitPassword = Omit<UserStrId, 'password'>;

export {
  UserZodSchema,
  IUser,
  IUserWithToken,
  TokenJWT,
  UserOmitPassword,
  UserObjectId,
}