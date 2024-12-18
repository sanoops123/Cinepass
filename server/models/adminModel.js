import mongoose  from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength:6,
    },
    mobile: {
      type: String,
      required: true,
      minLength:10,
    },
    role: {
      type: String,
      enum: "admin",
      default: 'admin',
    },
      movies: [
        { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Movie' 
        }
      ]
    
    
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("Admin", adminSchema);
