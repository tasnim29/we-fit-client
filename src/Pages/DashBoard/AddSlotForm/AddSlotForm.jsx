import React, { use } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

import Swal from "sweetalert2";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

const AddSlotForm = () => {
  const { user } = use(AuthContext);
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
      <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-10">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <span className="text-primary">➕</span> Add New Slot
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Trainer Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trainer Name
              </label>
              <input
                readOnly
                value={trainer.fullName}
                className="input input-bordered w-full bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                readOnly
                value={trainer.email}
                className="input input-bordered w-full bg-gray-50"
              />
            </div>
          </div>

          {/* Days */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Days
            </label>
            <Select value={dayOptions} isMulti isDisabled />
          </div>

          {/* Slot Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slot Name
            </label>
            <input
              {...register("slotName", { required: true })}
              placeholder="e.g., Morning Slot"
              className="input input-bordered w-full"
            />
          </div>

          {/* Slot Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slot Duration
            </label>
            <input
              {...register("slotTime", { required: true })}
              placeholder="e.g., 1 hour"
              className="input input-bordered w-full"
            />
          </div>

          {/* Class Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Class
            </label>
            <select
              {...register("classId", { required: "Please select a class" })}
              defaultValue=""
              className="select select-bordered w-full"
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

          {/* Submit */}
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
