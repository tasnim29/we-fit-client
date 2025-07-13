import React, { use, useState } from "react";
import SocialLogin from "../Login/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import UseAxios from "../../../Hooks/UseAxios";
import { toast } from "react-toastify";

const Register = () => {
  const [profilePic, setProfilePic] = useState("");
  const { createUser, updateUser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = UseAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // form submit
  const onsubmit = async (data) => {
    try {
      // 1. Create Firebase user
      const result = await createUser(data?.email, data?.password);

      // 2. Update Firebase profile with display name and image
      const profileInfo = {
        displayName: data.name,
        photoURL: profilePic,
      };

      await updateUser(profileInfo); // ✅ wait until updated

      // 3. Now use updated info to save to DB
      const userInformation = {
        name: data.name,
        email: result?.user?.email,
        userImage: profilePic,
        role: "member",
      };

      const res = await axiosInstance.post("/users", userInformation);
      console.log("User saved to MongoDB:", res.data);

      toast.success("Successfully registered");
      reset();

      setTimeout(() => navigate(location.state || "/"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  //get image
  const handleImage = async (e) => {
    const photo = e.target.files[0];
    const formData = new FormData();
    formData.append("image", photo);

    // post in imageBB
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_UPLOAD_KEY
      }`,
      formData
    );
    // console.log(res.data.data.url);
    setProfilePic(res.data.data.url);
  };
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Create your account
        </h2>
        <p className="text-sm text-center">
          Already have an account?
          <span>
            {" "}
            <Link className="text-secondary" to="/login">
              Log In Here
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
            {/* name */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </div>
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
            {/* user photo */}
            <div className="space-y-2">
              <label htmlFor="photo" className="block text-sm">
                Your Photo
              </label>
              <input
                type="file"
                onChange={handleImage}
                placeholder="Your photo"
                className="w-full px-3 py-2 border rounded-md "
              />
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
                {...register("password", { required: true, minLength: 8 })}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 "
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be at least 8 characters
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-secondary text-white transition duration-300 hover:scale-105 cursor-pointer"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
