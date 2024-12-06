import express from 'express';
import { UserControllers } from './user.controller';
import { StudentValidations } from '../student/student.validation';
import ValidateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  ValidateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
