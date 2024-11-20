
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../../config/AxiosInstance.jsx';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../redux/features/userSlice.jsx';

export const SignUpPage = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); 
 

  const user = {
    signup_api: role === "admin" ? "/admin/sign-up" : "/user/sign-up",
    login_route: role === "admin" ? "/admin/log-in" : "/user/log-in",
     Home_route: role === "admin" ? "/admin" : "/"
  };
 
   const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const response = await AxiosInstance({
        method: "POST",
        url: user.signup_api,
        data
      });
      console.log("response===", response);
      dispatch(saveUser(response.data));
      toast.success("Sign-up Successful!", { position: "bottom-center" });
      navigate(user.Home_route); 
    } catch (error) {
      toast.error("Sign-up Failed");
      console.log(error);
    }
  };

  const toggleRole = () => {
    setRole((prevRole) => (prevRole === "user" ? "admin" : "user"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label>Name</label>
            <input
              type='text'
              placeholder='Enter your name...'
              {...register("name")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder='Email'
              {...register("email")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-gray-700">Mobile</label>
            <input
              type="tel"
              placeholder='Enter your mobile (10digits)...'
              {...register("mobile")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              placeholder='Password'
              {...register("password")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold"
          >
            Sign up
          </button>
        </form>
        <div className="mt-4 text-center">
          <button onClick={toggleRole} className="text-blue-600 hover:underline">
            Sign up as {role === "user" ? "Admin" : "User"}
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Already have an account? <a href={"/login"} className="text-red-600 hover:underline">Log in</a></p>
        </div>
      </div>
    </div>
  );
};
