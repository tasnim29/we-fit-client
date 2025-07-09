import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import DashBoardHome from "../Pages/DashBoard/DashBoardHome/DashBoardHome";
import PrivateRoute from "../Privates/PrivateRoute";
import AddClassForm from "../Pages/DashBoard/AddClassForm/AddClassForm";
import BeTrainer from "../Pages/BeTrainer/BeTrainer";
import AppliedTrainers from "../Pages/DashBoard/AppliedTrainers/AppliedTrainers";
import AppliedTrainerDetails from "../Pages/DashBoard/AppliedTrainers/AppliedTrainerDetails";
import AllTrainers from "../Pages/AllTrainers/AllTrainers";
import TrainerDetails from "../Pages/AllTrainers/TrainerDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      //   authentication
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "all-trainers",
        Component: AllTrainers,
      },
      {
        path: "/trainer-details/:id",
        Component: TrainerDetails,
      },

      {
        path: "beTrainer",
        element: (
          <PrivateRoute>
            <BeTrainer></BeTrainer>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashBoardHome,
      },
      {
        path: "add-class",
        Component: AddClassForm,
      },
      {
        path: "applied-trainers",
        Component: AppliedTrainers,
      },
      {
        path: "applied-trainers/:id",
        Component: AppliedTrainerDetails,
      },
    ],
  },
]);
