import { model, Schema } from 'mongoose';
import { TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name name is required'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: String,
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'ID is required'],
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'User is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of Birth is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    contactNo: {
      type: String,
      unique: true,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact No is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    profileImage: {
      type: String,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

export const FacultyModel = model<TFaculty>('Faculty', facultySchema);
