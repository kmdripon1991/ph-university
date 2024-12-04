import express from 'express';
import { StudentControllers } from './student.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';

const router = express.Router();

router.get('/', StudentControllers.getAllStudents);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.patch(
  '/:studentId',
  ValidateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateSingleStudent,
);

router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
