import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Navbar from "./Components/Navabar/Navbar";
import VerifyEmail from './Pages/VerifyEmail'
import CheckMail from "./Pages/CheckMail ";
import Forgot from "./Pages/Forgot";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <Home />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <Navbar />
          <Login />
        </div>
      ),
    },
    {
      path: "/signup",
      element: (
        <div>
          <Navbar />
          <Signup />
        </div>
      ),
    },
    {
    path:"/verify/:token",
     element:<VerifyEmail />
    },
    {
    path:"/checkmail",
     element:<CheckMail  />
    },
    {
    path:"/forgot-password",
     element:<Forgot  />
    }
  ]);

  return <RouterProvider router={router} />;
}
