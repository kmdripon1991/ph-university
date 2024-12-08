import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AdminModel } from './admin.model';
import { adminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(AdminModel.find(), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModel.findOne({ _id: id });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  return result;
};

const updateSingleAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>,
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

  const result = await AdminModel.findOneAndUpdate(
    { id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedAdmin = await AdminModel.findOneAndUpdate(
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
      (err as Error).message || 'Failed to delete user',
    );
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateSingleAdminIntoDB,
  deleteAdminFromDB,
};
