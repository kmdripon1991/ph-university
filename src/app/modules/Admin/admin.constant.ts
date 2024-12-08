import { TGender } from './admin.interface';

export const Gender: TGender[] = ['Male', 'Female', 'Others'];

export const adminSearchableFields = [
  'email',
  'id',
  'contactNo',
  'emergencyContactNo',
  'name.firstName',
  'name.lastName',
  'name.middleName',
];
