import { createBrowserRouter, } from "react-router-dom";
import { Userlayout } from "../layout/Userlayout.jsx";
import { ErrorPage } from "../pages/user/ErrorPage.jsx";
import {Home} from "../pages/user/Home.jsx"
import { About } from "../pages/user/About.jsx";
import { Movies } from "../pages/user/Movies.jsx";
import { Events } from "../pages/user/Events.jsx";
import { Contact } from "../pages/user/Contact.jsx";
import { Plays } from "../pages/user/Plays.jsx";
import {LoginPage} from "../pages/shared/LoginPage.jsx" 
import {SignUpPage} from "../pages/shared/SignUpPage.jsx" 
import { Profile } from "../pages/user/Profile.jsx";
import { ProtectRoute } from "./ProtectRoute.jsx";
import { FetchMovieDetails } from "../pages/user/FetchMovieDetails.jsx";
import { Screens} from "../pages/user/Screens.jsx";
import { Seats } from "../pages/user/Seats.jsx";
import { Bookings } from "../pages/user/Bookings.jsx";
import { Payment } from "../pages/user/Payment.jsx";
import { PaymentSuccess } from "../pages/user/paymentSuccess.jsx";
import { AdminLayout } from "../layout/AdminLayout.jsx";
import { MoviesPage } from "../pages/admin/MoviesPage.jsx";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Userlayout/>,
      errorElement:<ErrorPage/>,
   
      children:[
        {
          path : 'login',
          element : <LoginPage/>
        },
        {
          path : 'signup',
          element : <SignUpPage/>
        },
        {
          path : '/',
          element : <Home/>
        },
        {
          path : 'About',
          element : <About/>
        },
        {
          path:'Movies',
          element:<Movies/>
        },
        {
        path:"Movies/movie-details/:id",
        element:<FetchMovieDetails/>
        },
        {
        path:'Events',
        element:<Events/>
      },
      {
        path:'Contact',
        element:<Contact/>
      },
      {
        path:'Plays',
        element:<Plays/>
      },
      {
      path:'profile',
      element:<Profile/>
      },
      {
       path:"Movies/movie-details/:id/Screens",
        element:<Screens/>
      },
      {
      path:"Movies/movie-details/:id/Screens/Seats",
      element:<Seats/>
      },
      ],
    
    },
    {
     path:"user",
     element:<ProtectRoute/>,
     children:[{

      path:"profile",
      element:<Profile/>
     },
     {
      path:"my-bookings",
      element:<Bookings/>
     },
     
    ]

    },
    {
      path:"Movies",
      element:<ProtectRoute/>,
      children:[{
     
        path:"/Movies/movie-details/:movieId/Screens/Seats/Payment",
        element:<Payment/>
      },
        {
       path:"/Movies/movie-details/:movieId/Screens/Seats/Payment/Payment-success",
       element:<PaymentSuccess/>
        },
     
       ]
      },
   {
      path:"/admin",
      element:<AdminLayout/>,
      children:[
        {
          path:"login",
          element:<LoginPage role="admin"/>
        },
        {
          path:"signup page",
          element:<SignUpPage role="admin"/>
        },
        {
           path:"admin/movies",
           element:<MoviesPage/>
        }
      ]
    }
   
    
      
  ]);