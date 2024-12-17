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
        .json({ message: "Admin registration successfull", savedAdmin, token });
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

/*export const adminProfile = async (req, res, next) => {
  try {
    const { admin } = req;

    const adminData = await Admin.findById(admin.id).select("-password");

    console.log(adminData);

    return res
      .status(200)
      .json({ message: "admin profile fetched!", data:adminData });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
  }
};*/
export const adminProfile = async (req, res, next) => {
  try {
    const { admin } = req;

    if (!admin || !admin.id) {
      return res.status(400).json({ error: "Invalid admin information" });
    }

    const adminData = await Admin.findById(admin.id).select("-password");

    if (!adminData) {
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log(adminData);

    return res.status(200).json({
      message: "Admin profile fetched successfully!",
      data: adminData,
    });
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return res.status(error.status || 500).json({
      message: "Failed to fetch admin profile",
      error: error.message || "Internal server error",
    });
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

export const updateAdminProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.admin,"data==");
    
    const admin= await Admin.findById(req.admin.id);
  
    if (!admin) {
      return res.status(404).json({ message: 'User not found' });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;

    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
    }

    await admin.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


import { Booking } from "../models/bookingModel.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("movieId", "title posterUrl")
      .populate("screenId", "name")
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      message: "All bookings fetched successfully.",
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
      error: error.message,
    });
  }
};
