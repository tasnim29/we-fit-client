import React, { use } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const dayOptions = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const skillsList = ["Yoga", "HIIT", "Strength Training", "Pilates", "Cardio"];

const BeTrainer = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const trainerData = {
      ...data,
      email: user?.email,
      status: "pending",
      availableDays: data.availableDays.map((day) => day.value), // Extract values from select
    };

    try {
      const res = await axiosSecure.post("/trainers", trainerData);
      if (res.data.insertedId || res.data.success) {
        Swal.fire("Success", "Trainer application submitted!", "success");
        reset();
      } else {
        Swal.fire("Error", "Failed to apply", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-32 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6">
        Apply to Be a Trainer
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
            className="w-full p-2 border rounded"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required", min: 18 })}
            className="w-full p-2 border rounded"
            placeholder="e.g. 25"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Profile Image URL */}
        <div>
          <label className="block mb-1 font-medium">Profile Image URL</label>
          <input
            type="text"
            defaultValue={user?.photoURL || ""}
            {...register("image", { required: "Profile image is required" })}
            className="w-full p-2 border rounded"
            placeholder="https://example.com/profile.jpg"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Skills (checkbox) */}
        <div>
          <label className="block mb-1 font-medium">Skills</label>
          <div className="flex flex-wrap gap-4">
            {skillsList.map((skill) => (
              <label key={skill} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={skill}
                  {...register("skills")}
                  className="accent-[var(--color-accent)]"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Available Days (React Select) */}
        <div>
          <label className="block mb-1 font-medium">
            Available Days (Pick multiple)
          </label>
          <Controller
            name="availableDays"
            control={control}
            rules={{ required: "Please select at least one day" }}
            render={({ field }) => (
              <Select
                {...field}
                options={dayOptions}
                isMulti
                isSearchable={false}
                closeMenuOnSelect={false}
                className="text-black"
              />
            )}
          />
          {errors.availableDays && (
            <p className="text-red-500 text-sm">
              {errors.availableDays.message}
            </p>
          )}
        </div>

        {/* Available Time */}
        <div>
          <label className="block mb-1 font-medium">Available Time</label>
          <input
            type="text"
            {...register("availableTime", { required: "Time is required" })}
            className="w-full p-2 border rounded"
            placeholder="e.g. 4PM - 6PM"
          />
          {errors.availableTime && (
            <p className="text-red-500 text-sm">
              {errors.availableTime.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[var(--color-accent)] hover:bg-orange-600 px-6 py-2 text-white font-semibold rounded"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeTrainer;
