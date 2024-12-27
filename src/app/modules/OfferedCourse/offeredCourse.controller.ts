import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { OfferedCourseServices } from './offeredCourse.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course created successfully',
    data: result,
  });
});

const allOfferedCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered courses retrieved successfully',
    data: result,
  });
});

const singleOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { offeredCourseId } = req.params;
  const result =
    await OfferedCourseServices.getSingleOfferedCourseFromDB(offeredCourseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course retrieved successfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { offeredCourseId } = req.params;
  const updateOfferedCourseData = req.body;
  const result = await OfferedCourseServices.updateSingleOfferedCourseIntoDB(
    offeredCourseId,
    updateOfferedCourseData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course updated successfully',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
  const { offeredCourseId } = req.params;
  const result =
    await OfferedCourseServices.getSingleOfferedCourseFromDB(offeredCourseId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Offered course deleted successfully',
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  allOfferedCourses,
  singleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
