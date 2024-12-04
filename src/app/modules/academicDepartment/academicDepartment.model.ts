import { model, Schema } from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      `${this.name} Department is already exists!!!`,
    );
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartmentModel.findOne({
    _id: query,
  });
  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Department does not exists!!!',
    );
  }
  next();
});

export const AcademicDepartmentModel = model(
  'AcademicDepartment',
  academicDepartmentSchema,
);
