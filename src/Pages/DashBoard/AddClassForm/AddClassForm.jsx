import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Class</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Class Name */}
        <div>
          <label className="block mb-1 font-medium">Class Name</label>
          <input
            type="text"
            {...register("className", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="e.g. Full Body Strength"
          />
          {errors.className && (
            <p className="text-red-500 text-sm">classname is required</p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">image URL is required</p>
          )}
        </div>

        {/* Details */}
        <div>
          <label className="block mb-1 font-medium">Details</label>
          <textarea
            {...register("details", { required: true })}
            className="w-full p-2 border rounded h-24"
            placeholder="Write a description of the class"
          />
          {errors.details && (
            <p className="text-red-500 text-sm">details is required</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 font-medium">
            Duration (e.g. 45 mins)
          </label>
          <input
            type="text"
            {...register("duration", { required: true })}
            className="w-full p-2 border rounded"
            placeholder="e.g. 45 mins"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm">duration is required</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            {...register("category", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select category</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga">Yoga</option>
            <option value="Strength">Strength</option>
            <option value="Cardio">Cardio</option>
            <option value="Pilates">Pilates</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">category is required</p>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block mb-1 font-medium">Level</label>
          <select
            {...register("level", { required: true })}
            className="w-full p-2 border rounded"
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm">level is required</p>
          )}
        </div>

        {/* Equipment */}
        <div>
          <label className="block mb-1 font-medium">Equipment Needed</label>
          <input
            type="text"
            {...register("equipment")}
            className="w-full p-2 border rounded"
            placeholder="e.g. Dumbbells, Yoga Mat"
          />
          {errors.equipment && (
            <p className="text-red-500 text-sm">equipment is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[var(--color-accent)] hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClassForm;
