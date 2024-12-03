import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty created successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculties = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All academic faculties retrieved successfully',
      data: result,
    });
  },
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result =
      await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Academic faculty retrieve successfully',
      data: result,
    });
  },
);
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
      facultyId,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty updated successfully',
      data: result,
    });
  },
);

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
