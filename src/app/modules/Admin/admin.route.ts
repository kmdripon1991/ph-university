import express from 'express';
import { AdminsControllers } from './admin.controller';
import { AdminsValidation } from './admin.validation';
import ValidateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', AdminsControllers.getAllAdmins);

router.get('/:id', AdminsControllers.getSingleAdmin);

router.patch(
  '/:id',
  ValidateRequest(AdminsValidation.updateAdminValidationSchema),
  AdminsControllers.updateSingleAdmin,
);

router.delete('/:id', AdminsControllers.deleteAdmin);

export const AdminRoutes = router;
