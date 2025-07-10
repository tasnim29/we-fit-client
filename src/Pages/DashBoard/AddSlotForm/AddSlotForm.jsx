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
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Add New Slot</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Read-only Trainer Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            readOnly
            value={trainer.fullName}
            className="input input-bordered w-full"
          />
          <input
            readOnly
            value={trainer.email}
            className="input input-bordered w-full"
          />
        </div>

        {/* Select Days (Read only via react-select) */}
        <div>
          <label className="block mb-1 font-semibold">Available Days</label>
          <Select value={dayOptions} isMulti isDisabled />
        </div>

        {/* Slot Name */}
        <div>
          <label className="block mb-1 font-semibold">Slot Name</label>
          <input
            {...register("slotName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Morning Slot"
          />
        </div>

        {/* Slot Time */}
        <div>
          <label className="block mb-1 font-semibold">
            Slot Time (e.g., 1 hour)
          </label>
          <input
            {...register("slotTime", { required: true })}
            className="input input-bordered w-full"
            placeholder="1 hour"
          />
        </div>

        {/* Class Selection */}
        <div>
          <label className="block mb-1 font-semibold">Select Class</label>
          <select
            {...register("classId", { required: "Please select a class" })}
            defaultValue=""
            className="select select-bordered w-full "
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
        <button className="btn btn-primary w-full" type="submit">
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlotForm;
