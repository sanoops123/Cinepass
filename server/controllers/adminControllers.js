import { Admin } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const adminSignup = async (req, res, next) => {
  try {
    const { name, email, password, mobile, } = req.body;

    if (!name || !email || !password || !mobile) {
      res.status(400).json({ message: "All fiels are required" });
    }

    const adminAlreadyExist = await Admin.findOne({ email });

    if (adminAlreadyExist) {
      return res.status(400).json({ error: "account already existed" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    const savedAdmin = await newAdmin.save();

    if (savedAdmin) {
      const token = await generateToken(savedAdmin._id, "admin");
      console.log(token, "token");
      res.cookie("token", token,{

        sameSite:"None",
        secure:true,
        httpOnly:true
  
        });

      return res
        .status(200)
        .json({ message: "user registration successfull", savedAdmin, token });
    }
    return res.status(400).json({ error: "something went wrong!" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if ((!email, !password)) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminExist = await Admin.findOne({ email });

    if (!adminExist) {
      return res.status(400).json({ message: "Account does not match" });
    }

    const passwordAdminMatch = await bcrypt.compare(
      password,
      adminExist.password
    );

    if (!passwordAdminMatch) {
      return res.status(200).json({ message: "password does not match" });
    }
    const token = await generateToken(adminExist._id, 'admin');

    res.cookie("token", token,{

      sameSite:"None",
      secure:true,
      httpOnly:true

      });
    res.status(200).json({ message: "Admin Login successfull", adminExist });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
  }
};

export const adminProfile = async (req, res, next) => {
  try {
    const { admin } = req;

    const userData = await Admin.findById(admin.id).select("-password");

    console.log(userData);

    return res
      .status(200)
      .json({ message: "admin profile fetched!", userData });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
  }
};

export const adminLogOut = async (req, res, next) => {
  try {
    res.clearCookie("token",{

      sameSite:"None",
      secure:true,
      httpOnly:true

      });
    res.status(200).json({ message: "Admin logged out!" });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    
    res.json({ success: true, message: "admin authorized" });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
  }
};
