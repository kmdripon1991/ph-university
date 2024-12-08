import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await StudentServices.getAllStudentsFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All students retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  // console.log('controller', studentId);
  const result = await StudentServices.getSingleStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  });
});

const updateSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateSingleStudentIntoDB(
    studentId,
    student,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateSingleStudent,
  deleteStudent,
};
