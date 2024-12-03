import { model, Schema } from 'mongoose';

const academicDepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicFaculty',
  },
});

export const AcademicDepartmentModel = model(
  'AcademicDepartment',
  academicDepartmentSchema,
);
