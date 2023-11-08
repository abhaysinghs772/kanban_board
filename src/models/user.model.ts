import mongoose , { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
); // timestamps to add created_at and updated_at

export const Usermodel = mongoose.models.User || mongoose.model('User', userSchema);