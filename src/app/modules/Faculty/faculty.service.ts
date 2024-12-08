import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { FacultyModel } from './faculty.model';
import { TFaculty } from './faculty.interface';
import { FacultySearchableFields } from './faculty.constant';

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(FacultyModel.find(), query)
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await FacultyModel.findOne({ _id: id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }
  return result;
};

const updateSingleFacultyIntoDB = async (
  id: string,
  payload: Partial<TFaculty>,
) => {
  const { name, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await FacultyModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedAdmin = await FacultyModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedAdmin;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.NOT_FOUND,
      (err as Error).message || 'Failed to delete Faculty',
    );
  }
};

export const FacultyServices = {
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
  updateSingleFacultyIntoDB,
  deleteFacultyFromDB,
};
