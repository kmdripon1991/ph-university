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
// router.patch(
//   '/:semesterId',
//   ValidateRequest(AcademicValidation.updateAcademicSemesterValidationSchema),
//   AcademicSemesterControllers.updateSingleAcademicSemester,
// );

router.delete('/:id', CourseControllers.deleteSingleCourse);

export const CourseRoutes = router;
