import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is created successfully',
      data: result,
    });
  },
);

const getAllAcademicSemesters = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AcademicSemesterServices.getAllAcademicSemestersFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All academic semester retrieve successfully',
      data: result,
    });
  },
);

const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params;
    // console.log(semesterId);
    const result =
      await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
        semesterId,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Individual academic semester retrieve successfully',
      data: result,
    });
  },
);
const updateSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { semesterId } = req.params;
    const result =
      await AcademicSemesterServices.updateSingleAcademicSemesterIntoDB(
        semesterId,
        req.body,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Individual academic semester updated successfully',
      data: result,
    });
  },
);
export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
