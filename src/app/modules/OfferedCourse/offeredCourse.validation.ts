import { z } from 'zod';
import { Days } from './offeredCourse.constant';

const timeValidationSchema = z.string().refine(
  (time) => {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: 'Start time must be in the 24-hour format HH:mm',
  },
);

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      academicDepartment: z.string(),
      course: z.string(),
      faculty: z.string(),
      maxCapacity: z
        .number()
        .int()
        .positive('Max capacity must be a positive integer'), // Validates positive integer
      section: z.number().int().positive('Section must be a positive integer'), // Validates positive integer
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeValidationSchema,
      endTime: timeValidationSchema,
    })
    .refine(
      (body) => {
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);
        return end > start;
      },
      { message: 'End time must occur after the start time.' },
    ),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string(),
    maxCapacity: z
      .number()
      .int()
      .positive('Max capacity must be a positive integer'),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeValidationSchema,
    endTime: timeValidationSchema,
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
