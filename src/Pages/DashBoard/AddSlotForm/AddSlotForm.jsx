import React, { use } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { Helmet } from "react-helmet-async";

const AddSlotForm = () => {
  const { user, theme } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const {
    data: trainer,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["trainer-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainer/profile/${user.email}`);
      return res.data;
    },
  });

  const { data: classes = [] } = useQuery({
    queryKey: ["all-classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    const selectedClass = classes.find((cls) => cls._id === data.classId);
    const slotData = {
      trainerId: trainer._id,
      trainerName: trainer.fullName,
      email: trainer.email,
      slotName: data.slotName,
      slotTime: data.slotTime,
      days: trainer.availableDays,
      classId: data.classId,
      className: selectedClass.className,
    };

    try {
      const res = await axiosSecure.post("/slots", slotData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Slot added successfully!", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add slot", "error");
    }
  };

  if (isLoading) return <p>Loading trainer info...</p>;
  if (isError)
    return <p className="text-red-500">Failed to load trainer data.</p>;

  const dayOptions = trainer.availableDays?.map((day) => ({
    value: day,
    label: day,
  }));

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <Helmet>
        <title>WeFit | Add Slot</title>
      </Helmet>
      <div className={`p-6 sm:p-10 rounded-xl shadow-sm  `}>
        {/* Header */}
        <h2
          className={`text-2xl font-semibold mb-6 flex items-center gap-2 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          <span className="text-primary">➕</span> Add New Slot
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Trainer Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Trainer Name
              </label>
              <input
                readOnly
                value={trainer.fullName}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-300"
                    : "bg-gray-50 border-gray-300 text-gray-800"
                }`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                readOnly
                value={trainer.email}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-300"
                    : "bg-gray-50 border-gray-300 text-gray-800"
                }`}
              />
            </div>
          </div>

          {/* Days */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Available Days
            </label>
            <Select
              value={dayOptions}
              isMulti
              isDisabled
              classNamePrefix={
                theme === "dark" ? "react-select-dark" : "react-select-light"
              }
            />
          </div>

          {/* Slot Name */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Slot Name
            </label>
            <input
              {...register("slotName", { required: true })}
              placeholder="e.g., Morning Slot"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
          </div>

          {/* Slot Time */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Slot Duration
            </label>
            <input
              {...register("slotTime", { required: true })}
              placeholder="e.g., 1 hour"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            />
          </div>

          {/* Class Selection */}
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Select Class
            </label>
            <select
              {...register("classId", { required: "Please select a class" })}
              defaultValue=""
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700 text-gray-300"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              <option disabled value="">
                -- Select a class --
              </option>
              {classes.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-full shadow transition"
          >
            Add Slot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSlotForm;
