import {
    createBrowserRouter,
  } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";
import Main from "../Layout/Main";
import Home from "../Home/Home";
import Register from "../Register/Register";
import LogIn from "../LogIn/LogIn";
import Task from "../Task/Task";
import MyTask from "../MyTask/MyTask";
import AddTask from "../AddTask/AddTask";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
            path:'/login',
            element:<LogIn></LogIn>
        },
        {
          path:'/task',
          element:<Task></Task>
        },
        {
          path:'/myTask',
          element:<MyTask></MyTask>
        },
        {
          path:'/addTask',
          element:<AddTask></AddTask>
        }
      ]
    }
  ]);