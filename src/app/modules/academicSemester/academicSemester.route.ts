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

export const AcademicSemesterRoutes = router;
