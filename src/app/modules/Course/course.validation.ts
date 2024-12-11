import { z } from 'zod';

const createPreRequisiteCourse = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credit: z.number(),
    preRequisiteCourses: z.array(createPreRequisiteCourse).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const updatePreRequisiteCourse = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credit: z.number().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCourse).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultyCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultyCourseValidationSchema,
};
