import config from '../../config/config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user
  const userData: Partial<TUser> = {};
  //if password is not given, use default password
  userData.password = password || (config.default_password as string);

  //set user role
  userData.role = 'student';

  //manually generated id
  userData.id = '2030200003';

  //create a user
  const user = await UserModel.create(userData);

  if (Object.keys(user).length) {
    studentData.id = user.id;
    studentData.user = user._id; //reference _id
    const newUser = await Student.create(studentData);
    return newUser;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
