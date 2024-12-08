import express from 'express';
import { AdminsControllers } from './admin.controller';
import { AdminsValidation } from './admin.validation';
import ValidateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', AdminsControllers.getAllAdmins);

router.get('/:adminId', AdminsControllers.getSingleAdmin);

router.patch(
  '/:adminId',
  ValidateRequest(AdminsValidation.updateAdminValidationSchema),
  AdminsControllers.updateSingleAdmin,
);

router.delete('/:adminId', AdminsControllers.deleteAdmin);

export const AdminRoutes = router;
