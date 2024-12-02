import config from '../../config/config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user
  const userData: Partial<TUser> = {};
  //if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set user role
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );
  if (!admissionSemester) {
    throw new Error('Admission semester not found');
  }

  //set generated id
  userData.id = await generateStudentId(admissionSemester);

  //create a user
  const user = await UserModel.create(userData);

  if (Object.keys(user).length) {
    payload.id = user.id;
    payload.user = user._id; //reference _id
    const newUser = await Student.create(payload);
    return newUser;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
