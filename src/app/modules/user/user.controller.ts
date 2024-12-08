import { Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);
  // console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);
  // console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin: adminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
