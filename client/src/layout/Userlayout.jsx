import React, { useEffect } from "react";
import { Header } from "../components/user/Header";
import { UserHeader } from "../components/user/UserHeader";
import { Footer } from "../components/user/Footer";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { AxiosInstance } from "../config/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { saveUser, clearUser } from "../redux/features/userSlice";

export const Userlayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const userAuthorized = useSelector((state) => state.user.userAuthorized);
  console.log("user auth===", userAuthorized);

  const checkuser = async () => {
    try {
      const response = await AxiosInstance({
        method: "GET",
        url: "/user/check-user",
      });
      console.log(response, "===response");
      dispatch(saveUser(response?.data));
    } catch (error) {
      dispatch(clearUser());
    }
  };
  useEffect(() => {
    checkuser();
  }, [location.pathname]);

  return (
    <div>
      {userAuthorized ? <UserHeader /> : <Header />}

      <div className="min-h-96">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
