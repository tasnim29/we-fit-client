import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "./SocialLogin";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const { signInUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Successfully Signed in");
        setTimeout(
          () => navigate(`${location.state ? location.state : "/"}`),
          1500
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid Password");
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to your account
        </h2>
        <p className="text-sm text-center">
          Dont have account?
          <span>
            {" "}
            <Link className="text-secondary" to="/register">
              Sign up here
            </Link>
          </span>
        </p>
        <div className="my-6 space-y-4">
          <SocialLogin></SocialLogin>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>
        <form onSubmit={handleSubmit(onsubmit)} className="space-y-8">
          <div className="space-y-4">
            {/* email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">email is required</p>
              )}
            </div>
            {/* password */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm">
                  Password
                </label>
              </div>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 "
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-secondary text-white transition duration-300 hover:scale-105 cursor-pointer"
          >
            Log In
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
