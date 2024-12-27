import express from 'express';
import { OfferedCourseControllers } from './offeredCourse.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidations } from './offeredCourse.validation';

const router = express.Router();

router.post(
  '/create-offered-course',
  ValidateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);
router.get('/', OfferedCourseControllers.createOfferedCourse);

router.get('/:offeredCourseId', OfferedCourseControllers.createOfferedCourse);

router.patch(
  '/:offeredCourseId',
  ValidateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

router.delete(
  '/:offeredCourseId',
  OfferedCourseControllers.deleteOfferedCourse,
);

export const OfferedCourseRoutes = router;
