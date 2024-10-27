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
import MovieDetails from '../pages/user/MovieDetails';
import { Screens } from "../pages/user/Screens.jsx";


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
        element:<MovieDetails/>
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
        path:"Movies/movie-details/:id/bookings",
        element:<Screens/>
      }
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
      element:<h2>my bookings</h2>
     }
    ]
    },
    {
      path:"admin",
      children:[
        {
          path:"login",
          element:<LoginPage role="admin"/>
        },
        {
          path:"signup page",
          element:<SignUpPage role="admin"/>
        }
      ]
    }
  ]);