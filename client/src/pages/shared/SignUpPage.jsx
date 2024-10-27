import React from 'react';
import { useForm, } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance } from '../../config/AxiosInstance.jsx';
import toast from 'react-hot-toast';

export const SignUpPage = ({role = 'user'}) => {
  const { register, handleSubmit} = useForm();
  const navigate = useNavigate()

 const user ={
  role:"user",
  login_api : "/user/log-in",
  profile_route :"/user/profile",
  signup_route : "/user/sign-up"
}

if (role==="admin"){
   user.role = "admin",
   user.login_api="/admin/log-in",
   user.profile_route="/admin/profile",
   user.signup_route="/admin/sign-up"

}

 const onSubmit  = async (data)=>{
  try {
    const response = await AxiosInstance({
      method:"POST",
      url: "/user/sign-up",
      data

    })
    console.log("response===" , response) ;
    toast.success(" Sign up Successfull ..",{position:"bottom-center"})
    navigate('/')
  } catch (error) {
    toast.error("Sign up Failed")
    console.log(error);
    
  }  

 }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up {role}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label>Name</label>
          <input
            type='name'
            id='name'
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
              id="email"
              placeholder='email'
             {...register("email")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700">mobile</label>
            <input
              type="Number"
              id="Number"
              placeholder='Enter your mobile no...'
              {...register("mobile")}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700"> Create a Password</label>
            <input
              type="password"
              id="password"
              placeholder='password'
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
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Already have an account? <a href="/login" className="text-red-600 hover:underline">Log in</a></p>
        </div>
      </div>
    </div>
    
  );
};



