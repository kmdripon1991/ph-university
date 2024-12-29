import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import httpStatus from 'http-status';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if there any upcoming or ongoing semester
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is an ${isThereAnyUpcomingOrOngoingSemester.status} semester`,
    );
  }

  //check if the academic semester is exist
  const isExistsAcademicSemester =
    await AcademicSemesterModel.findById(academicSemester);
  if (!isExistsAcademicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  //check if the semester registration exists
  const isExistsSemesterRegistration = await SemesterRegistrationModel.findOne({
    academicSemester,
  });

  if (isExistsSemesterRegistration) {
    throw new AppError(httpStatus.CONFLICT, 'Semester is already registered');
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .fields()
    .paginate();
  const result = await semesterRegistrationQuery.modelQuery;
  const meta = await semesterRegistrationQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistrationModel.findById(id).populate('academicSemester');
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExist =
    await SemesterRegistrationModel.findById(id);

  //check the requested semester is exist
  if (!isSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The requested semester is not found',
    );
  }

  //if current semester status is ended, we will not update
  const currentSemesterStatus = isSemesterRegistrationExist?.status;
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  //if current semester status is Upcoming and requested status is Ended, we will not update
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    payload.status === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is not update from ${currentSemesterStatus} to ${payload.status}`,
    );
  }

  //if current semester status is Ongoing and requested status is Upcoming, we will not update
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    payload.status === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is not update from ${currentSemesterStatus} to ${payload.status}`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  ).populate('academicSemester');
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
