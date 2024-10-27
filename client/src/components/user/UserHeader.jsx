import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Darkmode } from "../shared/Darkmode";
import { AxiosInstance } from "../../config/AxiosInstance";
import {ShoppingBag} from 'lucide-react'
import {SquareUser} from 'lucide-react'
import toast from "react-hot-toast";


export const UserHeader = () => {
  const navigate =useNavigate()

  const  logOut = async ()=>{
    try {
      const response = await AxiosInstance({
        method:"POST",
        url: "/user/log-out",
        
  
      })
      console.log("response===" , response) ;
      toast.success("Logout Successfull ..",{position:"top-center"})
      navigate("/login")
    } catch (error) {
      toast.error("Logout Failed")
      console.log(error);
      
    }  
  
   }
  return (

<header className="bg-blue-600 text-white shadow-lg  w-full ">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 ">
       
        <div className="text-2xl font-bold">
          <Link to={'/'} className="text-white">CinePass</Link>
        </div>

       
        <div className="hidden md:flex items-center bg-white rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search for Movies, Events, Plays..."
            className="px-4 py-2 w-80 text-gray-800 outline-none"
          />
          <button className="bg-red-700 hover:bg-red-800 px-4 py-2 text-white">
            Search
          </button>
        </div>

     
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to={'/Movies'} className="text-white hover:text-gray-300">Movies</Link>
          <Link to={'/Events'} className="text-white hover:text-gray-300">Events</Link>
          <Link to={'/Plays'} className="text-white hover:text-gray-300">Plays</Link>
          <Link to={'/About'} className="text-white hover:text-gray-300">About</Link>
        </nav>
       <Darkmode/>
       <span>welcome </span>
      <div className="hidden md:flex space-x-6 items-center">
      <Link to={'/user/my-bookings'}><h2 className="text-white">My-Bookings</h2><ShoppingBag /></Link>
      <Link to={'/user/profile'} ><h2 className="">Profile </h2><SquareUser/></Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
      <Link to={''} onClick={logOut}  className=" bg-red-700 text-white hover:bg-red-800 px-4 py-2 rounded-md">Log Out </Link>
      </div>
      
       

       
    
  </div>
  </header>
  );
};
