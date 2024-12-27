import { z } from 'zod';
import { User_Status } from './user.constant';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'Password must be a string' })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
});

const userStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...User_Status] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  userStatusValidationSchema,
};
