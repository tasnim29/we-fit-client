import React, { use, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import axios from "axios";

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
  const [photoURL, setPhotoURL] = useState("");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    setUploading(true);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGE_UPLOAD_KEY
        }`,
        formData
      );
      setPhotoURL(res.data.data.url);
      setUploading(false);
    } catch (err) {
      console.error("Image upload failed", err);
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    const trainerData = {
      fullName: data.fullName,
      email: user?.email,
      age: data.age,
      image: photoURL,
      skills: data.skills,
      availableDays: data.availableDays.map((d) => d.value),
      availableTime: data.availableTime,
      experience: data.experience,
      bio: data.bio,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/trainers", trainerData);
      if (res.data.insertedId || res.data.success) {
        Swal.fire("Success", "Trainer application submitted!", "success");
        reset();
        setPhotoURL("");
      } else {
        Swal.fire("Error", "Failed to apply", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-32 bg-white rounded shadow px-6">
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

        {/* Email (readonly) */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
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

        {/* Upload Professional Photo */}
        <div>
          <label className="block mb-1 font-medium">Professional Photo</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-1 font-medium">Years of Experience</label>
          <input
            type="number"
            {...register("experience", {
              required: "Experience is required",
              min: 0,
            })}
            className="w-full p-2 border rounded"
            placeholder="e.g. 3"
          />
          {errors.experience && (
            <p className="text-red-500 text-sm">{errors.experience.message}</p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-1 font-medium">Brief Biography</label>
          <textarea
            {...register("bio", { required: "Bio is required" })}
            className="w-full p-2 border rounded"
            placeholder="Tell us a little about yourself..."
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-1 font-medium">Skills</label>
          <div className="flex flex-wrap gap-4">
            {skillsList.map((skill) => (
              <label key={skill} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={skill}
                  {...register("skills")}
                  className="accent-primary"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div>
          <label className="block mb-1 font-medium">Available Days</label>
          <Controller
            name="availableDays"
            control={control}
            rules={{ required: "Select at least one day" }}
            render={({ field }) => (
              <Select
                {...field}
                options={dayOptions}
                isMulti
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

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={!photoURL || uploading}
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-80 transition"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeTrainer;
