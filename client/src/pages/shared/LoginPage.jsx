
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { AxiosInstance } from '../../config/AxiosInstance.jsx';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveUser } from '../../redux/features/userSlice.jsx';

export const LoginPage = () => {
    const [role, setRole] = useState("user"); 
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const { message } = location.state || {}; 

    const user = {
        login_api: role === "admin" ? "/admin/log-in" : "/user/log-in",
        profile_route: role === "admin" ? "/admin/profile" : "/user/profile",
        signup_route: role === "admin" ? "/admin/sign-up" : "/user/sign-up",
         Home_route: role === "admin" ? "/admin/Home" : "/"
    };

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const response = await AxiosInstance({
                method: "POST",
                url: user.login_api,
                data
            });
            console.log("response===", response);
            dispatch(saveUser(response.data));
            toast.success("Login Successful ..", { position: "bottom-center" });
            navigate(user.Home_route); 
        } catch (error) {
            toast.error("Login Failed: " + (error.response?.data?.message || "Please try again.")); 
            console.log(error);
        }
    };

    const toggleRole = () => {
        setRole((prevRole) => (prevRole === "user" ? "admin" : "user"));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Log In as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder='password'
                            {...register("password")}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <a href="/forgot-password" className="text-sm text-red-600 hover:underline">Forgot Password?</a>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold"
                    >
                        Log In
                    </button>
                </form>
                {message && (
                    <div className="alert alert-warning">
                        {message}
                    </div>
                )}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">Don't have an account? <a href={"/signup"} className="text-red-600 hover:underline">Register</a></p>
                </div>
                <div className="mt-4 text-center">
                    <button 
                        onClick={toggleRole} 
                        className="text-blue-600 hover:underline">
                        Login as {role === "user" ? "Admin" : "User"}
                    </button>
                </div>
            </div>
        </div>
    );
};


