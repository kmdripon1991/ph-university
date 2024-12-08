import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { UserModel } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  //   console.log(lastStudent?.id.substring(6));

  return lastStudent?.id ? lastStudent.id : undefined;
};

// 2030 01 0001

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString(); // 0000 by default
  const lastStudentId = await findLastStudentId(); // 2030010001
  const lastStudentYear = lastStudentId?.substring(0, 4); //2030
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const currentStudentYear = payload.year;
  const currentStudentSemesterCode = payload.code;
  if (
    lastStudentId &&
    lastStudentYear === currentStudentYear &&
    lastStudentSemesterCode === currentStudentSemesterCode
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};

const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateFacultyId = async () => {
  let currentId = (0).toString(); // 0000 by default
  const lastFacultyId = await findLastFacultyId(); // F-0001
  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `F-${incrementId}`;

  return incrementId;
};

const findLastAdminId = async () => {
  const lastAdmin = await UserModel.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdmin?.id ? lastAdmin.id : undefined;
};

export const generateAdminId = async () => {
  let currentId = (0).toString(); // 0000 by default
  const lastFacultyId = await findLastAdminId(); // F-0001
  if (lastFacultyId) {
    currentId = lastFacultyId.substring(2);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `A-${incrementId}`;

  return incrementId;
};
