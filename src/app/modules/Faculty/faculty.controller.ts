import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await FacultyServices.getAllFacultyFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Faculties retrieved successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params;
  // console.log('controller', studentId);
  const result = await FacultyServices.getSingleFacultyFromDB(facultyId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  });
});

const updateSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const { facultyId } = req.params;
  const { faculty } = req.body;
  const result = await FacultyServices.updateSingleFacultyIntoDB(
    facultyId,
    faculty,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { adminId } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  updateSingleFaculty,
  deleteFaculty,
};
