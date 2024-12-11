import express from 'express';
import { CourseControllers } from './course.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  ValidateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.patch(
  '/:id',
  ValidateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  ValidateRequest(CourseValidation.facultyCourseValidationSchema),
  CourseControllers.assignFacultyWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  ValidateRequest(CourseValidation.facultyCourseValidationSchema),
  CourseControllers.removeFacultyWithCourse,
);

router.delete('/:id', CourseControllers.deleteSingleCourse);

export const CourseRoutes = router;
