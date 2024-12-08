import { z } from 'zod';
import { BloodGroup, Gender } from './faculty.constant';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20)
    .min(1)
    .trim()
    .refine(
      (value) => /^[A-Z][a-zA-Z]*$/.test(value),
      'First name must start with a capital letter and contain only alphabetic characters',
    ),
  middleName: z.string().optional(),
  lastName: z.string().max(20).min(1).trim(),
});
const updateUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20)
    .min(1)
    .trim()
    .refine(
      (value) => /^[A-Z][a-zA-Z]*$/.test(value),
      'First name must start with a capital letter and contain only alphabetic characters',
    )
    .optional(),
  middleName: z.string().optional(),
  lastName: z.string().max(20).min(1).trim().optional(),
});

const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    faculty: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string().max(300),
      permanentAddress: z.string().max(300),
      profileImage: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});
const updateFacultyValidationSchema = z.object({
  body: z.object({
    name: updateUserNameValidationSchema.optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
    presentAddress: z.string().max(300).optional(),
    permanentAddress: z.string().max(300).optional(),
    profileImage: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
});

export const FacultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
