import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { AxiosInstance } from '../../config/AxiosInstance.jsx';
import { Darkmode } from '../shared/Darkmode.jsx';

export const AdminHeader = () => {
    const navigate =useNavigate()
    const location = useLocation();
    const  logOut = async ()=>{
        try {
          const response = await AxiosInstance({
            method:"POST",
            url: "/admin/log-out",
            
      
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
        <header className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <nav>
                    <Link to="admin/movies" className={`mr-4 ${location.pathname === '/admin/movies' ? 'underline' : ''}`}>
                        Movies
                    </Link>
                    <Link to="/admin/add-movie" className={`mr-4 ${location.pathname === '/admin/add-movie' ? 'underline' : ''}`}>
                        Add Movie
                    </Link>
                    <Link to="/admin/add-screen" className={`mr-4 ${location.pathname === '/admin/add-screen' ? 'underline' : ''}`}>
                        Add Screen
                    </Link>
                    <Link to="/admin/profile" className={`mr-4 ${location.pathname === '/admin/profile' ? 'underline' : ''}`}>
                        Profile
                    </Link>
                    <Darkmode/>
                    <Link to="" onClick={logOut} className="text-red-500">
                        Logout
                    </Link>
                </nav>
            </div>
        </header>
    );
};
