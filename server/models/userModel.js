import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,

    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
      mobile:{
       type: String,
       required:true,
       minLength:10,
    },

    bookings:{
      type: Array,
      default: [],
    },

    state: {
      type: String,
      //required: true,
    },
    city: {
      type: String,
      //required: true,
    },

    profilepic: {
      type : String,
      default:""
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
