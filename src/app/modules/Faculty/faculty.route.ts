import express from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { FacultyValidation } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyControllers.getAllFaculties);

router.get('/:facultyId', FacultyControllers.getSingleFaculty);

router.patch(
  '/:facultyId',
  ValidateRequest(FacultyValidation.updateFacultyValidationSchema),
  FacultyControllers.updateSingleFaculty,
);

router.delete('/:facultyId', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
