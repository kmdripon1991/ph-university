/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config/config';
import AppError from '../../errors/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import httpStatus from 'http-status';
import { FacultyModel } from '../Faculty/faculty.model';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { TFaculty } from '../Faculty/faculty.interface';
import { AdminModel } from '../Admin/admin.model';
import { uploadImageToCloudinary } from '../../utils/sendImageToCloudinary';

const createStudentIntoDB = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  file: any,
  password: string,
  payload: TStudent,
) => {
  //create a user
  const userData: Partial<TUser> = {};
  //if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set user role
  userData.role = 'student';
  //set user email
  userData.email = payload.email;

  //find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }

  //crate session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //set generated id
    userData.id = await generateStudentId(admissionSemester);

    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file?.path;

    const { secure_url } = (await uploadImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };
    console.log(secure_url);

    //create a user(start transaction-1)
    const newUser = await User.create([userData], { session }); //array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImg = secure_url;

    //create a student(start transaction-2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent[0]; //return newStudent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    // throw new AppError(
    //   httpStatus.INTERNAL_SERVER_ERROR,
    //   (err as Error).message || 'Failed to create student',
    // );
    throw new Error(err);
  }
};
const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  //create a user
  const userData: Partial<TUser> = {};
  //if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set user role
  userData.role = 'faculty';
  //set user email
  userData.email = payload.email;
  // console.log(userData);

  //find academic faculty info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );
  // console.log(academicDepartment);
  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }

  //crate session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //set generated id
    userData.id = await generateFacultyId();
    const imageName = `${userData.id}${payload?.name?.firstName}`;
    console.log(file);
    const path = file?.path;
    // let secureUrl = '';
    // if (path) {
    //   const { secure_url } = (await uploadImageToCloudinary(
    //     imageName,
    //     path,
    //   )) as {
    //     secure_url: string;
    //   };
    //   secureUrl = secure_url;
    // }

    const { secure_url } = (await uploadImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    //create a user(start transaction-1)
    const newUser = await User.create([userData], { session }); //array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Faculty');
    }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImage = secure_url;

    //create a faculty (start transaction-2)
    const newFaculty = await FacultyModel.create([payload], { session });
    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }
    await session.commitTransaction();
    await session.endSession();
    return newFaculty[0]; //return newStudent
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  //create a user
  const userData: Partial<TUser> = {};
  //if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set user role
  userData.role = 'admin';
  //set user email
  userData.email = payload.email;
  // console.log('from user service', userData);

  //crate session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //set generated id
    userData.id = await generateAdminId();
    // console.log(userData.id);

    const imageName = `${userData.id}${payload?.name?.firstName}`;
    const path = file.path;
    const { secure_url } = (await uploadImageToCloudinary(imageName, path)) as {
      secure_url: string;
    };

    //create a user(start transaction-1)
    const newUser = await User.create([userData], { session }); //array

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }
    //set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id
    payload.profileImage = secure_url;

    //create a admin (start transaction-2)
    const newAdmin = await AdminModel.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }
    await session.commitTransaction();
    await session.endSession();
    return newAdmin[0]; //return newStudent
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMeFromDB = async (userId: string, role: string) => {
  let result = null;
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }

  if (role === 'faculty') {
    result = await FacultyModel.findOne({ id: userId }).populate('user');
  }

  if (role === 'admin') {
    result = await AdminModel.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDB,
  changeStatus,
};
