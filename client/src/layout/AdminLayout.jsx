
import React, { useEffect } from "react";
import { AdminHeader } from "../components/admin/AdminHeader";
import { Header } from "../components/user/Header";
import { Footer } from "../components/user/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { AxiosInstance } from "../config/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { saveAdmin, clearAdmin } from "../redux/features/userSlice";

export const AdminLayout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const adminAuthorized = useSelector((state) => state.user.adminAuthorized);

console.log("admin auth ====",adminAuthorized);
  

  const checkAdmin = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: "/admin/check-admin",
      });
      dispatch(saveAdmin(response?.data));
    } catch (error) {
      dispatch(clearAdmin());
    }
  };

  useEffect(() => {
    checkAdmin();
    console.log("Current path:", location.pathname);
  }, [location.pathname]);

  return (
    <div>
      {adminAuthorized ? <AdminHeader /> : <Header />}

      <div className="min-h-96">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
