import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await AdminServices.getAllAdminsFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Admins retrieved successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { adminId } = req.params;
  // console.log('controller', studentId);
  const result = await AdminServices.getSingleAdminFromDB(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  });
});

const updateSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateSingleAdminIntoDB(adminId, admin);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const result = await AdminServices.deleteAdminFromDB(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  });
});

export const AdminsControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateSingleAdmin,
  deleteAdmin,
};
