import { createBrowserRouter, } from "react-router-dom";
import { Userlayout } from "../layout/Userlayout";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Userlayout/>
    },
  ]);