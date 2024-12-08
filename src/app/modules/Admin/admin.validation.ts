import { z } from 'zod';
import { Gender } from './admin.constant';

export const createUserNameSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20).optional(),
  lastName: z.string().max(20),
});
export const updateUserNameSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().max(20).optional(),
  lastName: z.string().max(20).optional(),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().min(1),
    admin: z.object({
      designation: z.string(),
      name: createUserNameSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Please provide a valid email address'),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      profileImage: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});
export const updateAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().min(1).optional(),
    admin: z.object({
      designation: z.string().optional(),
      name: createUserNameSchema.optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .email('Please provide a valid email address')
        .optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      profileImage: z.string().optional(),
      // isDeleted: z.boolean().default(false),
    }),
  }),
});

export const AdminsValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
