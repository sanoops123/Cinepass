import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserHeader } from '../components/user/UserHeader'
import { Footer } from '../components/user/Footer'

export const ProtectRoute = () => {
   
  const userAuthorized = useSelector((state)=>state.user.userAuthorized)
   const navigate = useNavigate()

   console.log("userAuthorizeddd ====" ,userAuthorized);
   

 
   useEffect(()=>{
    if (!userAuthorized){
      navigate("/login",{
        state:{message:"You need to log in or sign up to access that page and try again !.."}
      })
     }
   },[])
   

   

  return  (
    <>
      {userAuthorized && <UserHeader />}
      <Outlet />
      <Footer />
    </>
  );
}
