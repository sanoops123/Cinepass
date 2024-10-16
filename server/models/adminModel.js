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
    },
    mobile: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: "admin",
      default: 'admin',
    },
      movies: [
        { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Movie' // Make sure the collection name matches the name used in the referenced schema
        }
      ]
    
    
  },
  {
    timestamps: true,
  }
);

export const Admin = mongoose.model("Admin", adminSchema);
