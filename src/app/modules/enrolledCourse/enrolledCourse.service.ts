/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { Student } from '../student/student.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import httpStatus from 'http-status';
import EnrolledCourse from './enrolledCourse.model';
import OfferedCourseModel from '../OfferedCourse/offeredCourse.model';
import mongoose from 'mongoose';

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  /*
  step1: Check the offered course is exists
  step2: Check the student is already enrolled
  step3: Now create an enrolled course
  **/

  const { offeredCourse } = payload;

  const isOfferedCourseExists =
    await OfferedCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found');
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    semesterRegistration: isOfferedCourseExists.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student is already enrolled this course',
    );
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full!!!');
  }

  //crate session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const result = await EnrolledCourse.create({
      semesterRegistration: isOfferedCourseExists.semesterRegistration,
      academicSemester: isOfferedCourseExists.academicSemester,
      academicFaculty: isOfferedCourseExists.academicFaculty,
      academicDepartment: isOfferedCourseExists.academicDepartment,
      offeredCourse,
      course: isOfferedCourseExists.course,
      student: student._id,
      faculty: isOfferedCourseExists.faculty,
      isEnrolled: true,
    });

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enrollment to this course',
      );
    }
    const maxCapacity = isOfferedCourseExists.maxCapacity;
    await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
      maxCapacity: maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
};
