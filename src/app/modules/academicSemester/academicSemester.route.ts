import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { AcademicValidation } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  ValidateRequest(AcademicValidation.createAcademicSemesterValidationSchema),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);
router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
);
router.patch(
  '/:semesterId',
  ValidateRequest(AcademicValidation.updateAcademicSemesterValidationSchema),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

export const AcademicSemesterRoutes = router;
