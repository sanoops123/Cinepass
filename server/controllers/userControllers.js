import { User } from "../models/userModel.js";
import { Booking } from "../models/bookingModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

export const userSignup = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
      res.status(400).json({ message: "All fiels are required" });
    }

    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      return res.status(400).json({ error: "user already existed" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      const token = await generateToken(savedUser._id);
      console.log(token, "token");
      res.cookie("token", token,{

      sameSite:"None",
      secure:true,
      httpOnly:true

      });

      return res
        .status(200)
        .json({ message: "user registration successfull", savedUser, token });
    }
    return res.status(400).json({ error: "something went wrong!" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "user does not existed" });
    }

    const passwordMatch = await bcrypt.compare(password, userExist.password);

    if (!passwordMatch) {
      return res.status(200).json({ message: "password does not match" });
    }
    const token = await generateToken(userExist._id,'user');

    res.cookie("token", token,{

      sameSite:"None",
      secure:true,
      httpOnly:true

      });
    res.status(200).json({ message: " user Login successfull",userExist });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
  }
};

/*export const userProfile = async (req, res, next) => {
  try {
    const { user } = req;

    const userData = await User.findById(user.id).select("-password");

    return res.status(200).json({ message: "user profile fetched!",data: userData });
  } catch (error) {
    console.log(error);
    return res
      .status(error.status || 500)
      .json({ error: error.message || "internal server error" });
  }
};
*/
export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const userLogOut = async (req,res,next)=>{
  try {
    
    res.clearCookie("token",{

      sameSite:"None",
      secure:true,
      httpOnly:true

      })
    res.status(200).json({message:"user logged out!"})
  } catch (error) {
    return res
    .status(error.status || 500)
    .json({ error: error.message || "internal server error" });
  }
}

export const checkUser = async (req,res,next)=>{
  try {
    
    res.json({ success: true, message: "user authorized" });
  } catch (error) {
    return res
    .status(error.status || 500)
    .json({ error: error.message || "internal server error" });
  }
}

export const getBookingsByUser = async (req, res,next) => {
  try {
    const userId = req.params.userId;
    const userBookings = await Booking.find({ userId }).populate('movieId', 'title releaseDate');
    res.status(200).json({message:"my Bookings",data:userBookings});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings for user', error });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


