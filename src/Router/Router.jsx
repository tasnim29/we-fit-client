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
import TrainerBookedPage from "../Pages/TrainerBookedPage/TrainerBookedPage";
import AddSlotForm from "../Pages/DashBoard/AddSlotForm/AddSlotForm";
import AddForum from "../Pages/DashBoard/AddForum/AddForum";
import ActivityLog from "../Pages/DashBoard/ActivityLog/ActivityLog";
import ProfilePage from "../Pages/DashBoard/ProfilePage/ProfilePage";
import AllTrainersInAdmin from "../Pages/DashBoard/AllTrainersInAdmin/AllTrainersInAdmin";
import NewsletterSubscribers from "../Pages/DashBoard/NewsletterSubscribers/NewsletterSubscribers";
import PaymentPage from "../Pages/PaymentPage/PaymentPage";
import AllClasses from "../Pages/AllClasses/AllClasses";
import ForumPage from "../Pages/ForumPage/ForumPage";
import Balance from "../Pages/DashBoard/Balance/Balance";
import ManageSlots from "../Pages/DashBoard/ManageSlots/ManageSlots";
import BookedTrainer from "../Pages/DashBoard/BookedTrainer/BookedTrainer";
import ForumDetails from "../Pages/ForumPage/ForumDetails";

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
        path: "all-classes",
        Component: AllClasses,
      },
      {
        path: "forums",
        Component: ForumPage,
      },
      {
        path: "trainer-details/:id",
        Component: TrainerDetails,
      },
      {
        path: "forums/:id",
        Component: ForumDetails,
      },

      {
        path: "beTrainer",
        element: (
          <PrivateRoute>
            <BeTrainer></BeTrainer>
          </PrivateRoute>
        ),
      },
      {
        path: "trainer-booking/:id",
        element: (
          <PrivateRoute>
            <TrainerBookedPage></TrainerBookedPage>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <PaymentPage />
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
      // admin routes
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
      {
        path: "all-trainers",
        Component: AllTrainersInAdmin,
      },
      {
        path: "newsletter-subscribers",
        Component: NewsletterSubscribers,
      },
      {
        path: "balance",
        Component: Balance,
      },
      // trainer routes
      {
        path: "add-slot",
        Component: AddSlotForm,
      },
      {
        path: "manage-slots",
        Component: ManageSlots,
      },
      // both admin and trainer
      {
        path: "add-forum",
        Component: AddForum,
      },
      // member
      {
        path: "activity-log",
        Component: ActivityLog,
      },
      {
        path: "profile",
        Component: ProfilePage,
      },
      {
        path: "booked-trainer",
        Component: BookedTrainer,
      },
    ],
  },
]);
