import { z } from 'zod';

const UserZodSchema = z.object({
  firstName: z.string({ invalid_type_error: "First name must be a string!" })
    .min(3, { message: "First name must have min 3 characters!" }),  
  secondName: z.string({ invalid_type_error: "Second name must be a string!" })
    .min(5, { message: "Second name must have min 3 characters!" }),
});

type IUser = z.infer<typeof UserZodSchema>;
type IUserWithToken = IUser & { token: string };

export {
  UserZodSchema,
  IUser,
  IUserWithToken
}