import express from 'express';
import { UserControllers } from './user.controller';
import { StudentValidations } from '../student/student.validation';
import ValidateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from '../Faculty/faculty.validation';
import { AdminsValidation } from '../Admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  ValidateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  ValidateRequest(FacultyValidation.createFacultyValidationSchema),
  UserControllers.createFaculty,
);
router.post(
  '/create-admin',
  ValidateRequest(AdminsValidation.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoutes = router;
