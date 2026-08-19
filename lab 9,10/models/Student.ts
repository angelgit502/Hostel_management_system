import mongoose, { Schema, Model } from "mongoose";

export interface IStudent {
  name: string;
  email: string;
  phone: string;
  course: string;
}

const StudentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student: Model<IStudent> =
  mongoose.models.Student ||
  mongoose.model<IStudent>("Student", StudentSchema);

export default Student;