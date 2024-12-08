import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isFacultyExist = await AcademicFacultyModel.findOne({
    name: this.name,
  });
  if (isFacultyExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      `${this.name} is already exists!!!`,
    );
  }
  next();
});

export const AcademicFacultyModel = model(
  'AcademicFaculty',
  academicFacultySchema,
);
