import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { AxiosInstance } from '../../config/AxiosInstance.jsx';
import { Darkmode } from '../shared/Darkmode.jsx';

export const AdminHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const logOut = async () => {
        try {
            await AxiosInstance.post("/admin/log-out");
            toast.success("Logout Successful", { position: "top-center" });
            navigate("/login");
        } catch (error) {
            toast.error("Logout Failed");
        }
    };

    return (
        <header className="bg-gray-900 text-white shadow-lg py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                <h1 className="text-2xl font-bold tracking-wide">Admin Dashboard</h1>
                <nav className="flex space-x-6 items-center">
                <Link
                        to="/admin/Home"
                        className={`text-lg font-medium hover:text-gray-300 transition ${
                            location.pathname === "/admin/Home" ? "text-blue-400" : ""
                        }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/admin/moviespage"
                        className={`text-lg font-medium hover:text-gray-300 transition ${
                            location.pathname === "/admin/moviespage" ? "text-blue-400" : ""
                        }`}
                    >
                        Movies
                    </Link>
                    <Link
                        to="/admin/add-movie"
                        className={`text-lg font-medium hover:text-gray-300 transition ${
                            location.pathname === "/admin/add-movie" ? "text-blue-400" : ""
                        }`}
                    >
                        Add Movie
                    </Link>
                    <Link
                        to="/admin/settings"
                        className={`text-lg font-medium hover:text-gray-300 transition ${
                            location.pathname === "/admin/settings" ? "text-blue-400" : ""
                        }`}
                    >
                        Settings
                    </Link>
                    <Link
                        to="/admin/profile"
                        className={`text-lg font-medium hover:text-gray-300 transition ${
                            location.pathname === "/admin/profile" ? "text-blue-400" : ""
                        }`}
                    >
                        Profile
                    </Link>
                    <Darkmode />
                    <button
                        onClick={logOut}
                        className="text-red-500 font-medium hover:text-red-400 transition duration-200 text-lg"
                    >
                        Logout
                    </button>
                </nav>
            </div>
        </header>
    );
};
