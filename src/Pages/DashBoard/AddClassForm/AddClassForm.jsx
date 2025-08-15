import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddClassForm = () => {
  const axiosSecure = UseAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/classes", data);
      if (res.data.insertedId || res.data.success) {
        Swal.fire("Success", "Class added successfully!", "success");
        reset();
      } else {
        Swal.fire("Error", "Failed to add class", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 bg-white ">
      <Helmet>
        <title>WeFit | Add Classes </title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-10 text-center ">Add New Class</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Class Name */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Class Name
          </label>
          <input
            type="text"
            {...register("className", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition"
            placeholder="Enter class name"
          />
          {errors.className && (
            <p className="text-red-500 text-sm mt-1">Class name is required</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition"
            placeholder="Enter image URL"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">Image URL is required</p>
          )}
        </div>

        {/* Details */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Details
          </label>
          <textarea
            {...register("details", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg h-28 resize-none focus:outline-none focus:ring-2 focus:ring-accent transition"
            placeholder="Write a description of the class.."
          />
          {errors.details && (
            <p className="text-red-500 text-sm mt-1">Details are required</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Duration
          </label>
          <input
            type="text"
            {...register("duration", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition"
            placeholder="Enter duration"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">Duration is required</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Category
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition"
          >
            <option value="">Select category</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga">Yoga</option>
            <option value="Strength">Strength</option>
            <option value="Cardio">Cardio</option>
            <option value="Pilates">Pilates</option>
            <option value="Zumba">Zumba</option>
            <option value="functional Training">Functional Training</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">Category is required</p>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Level
          </label>
          <select
            {...register("level", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition"
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">Level is required</p>
          )}
        </div>

        {/* Equipment */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Equipment Needed
          </label>
          <input
            type="text"
            {...register("equipment")}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition"
            placeholder="Enter the equipments"
          />
          {errors.equipment && (
            <p className="text-red-500 text-sm mt-1">Equipment is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-accent cursor-pointer transition duration-300 hover:scale-105  text-white font-semibold px-8 py-3 rounded-lg"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClassForm;
