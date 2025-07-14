import React, { use, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import axios from "axios";
import UseUserRole from "../../Hooks/UseUserRole";
import { Helmet } from "react-helmet-async";

const dayOptions = [
  { value: "Sunday", label: "Sunday" },
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
];

const skillsList = [
  "Yoga",
  "HIIT",
  "Strength Training",
  "Pilates",
  "Cardio",
  "Zumba",
  "Functional Training",
];

const BeTrainer = () => {
  const axiosSecure = UseAxiosSecure();
  const { role } = UseUserRole();
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

  if (role === "trainer") {
    return (
      <div className="max-w-xl mx-auto my-32 text-center bg-white rounded-lg shadow-lg p-10">
        <Helmet>
          <title>WeFit | All-Trainers</title>
        </Helmet>
        <h2 className="text-3xl font-extrabold mb-4 text-primary">
          You are already a trainer
        </h2>
        <p className="mb-6 text-gray-700">
          Thanks for being part of our trainer community! You don’t need to
          apply again.
        </p>
        <a
          href="/dashboard"
          className="inline-block bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition"
        >
          Go to Trainer Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-32 bg-white rounded-2xl shadow-lg px-8">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-primary">
        Apply to Be a Trainer
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block mb-2 font-semibold text-secondary">
            Full Name
          </label>
          <input
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-600 mt-1 text-sm">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block mb-2 font-semibold text-secondary">
            Email
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block mb-2 font-semibold text-secondary">Age</label>
          <input
            type="number"
            {...register("age", { required: "Age is required", min: 18 })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g. 25"
          />
          {errors.age && (
            <p className="text-red-600 mt-1 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Upload Professional Photo */}
        <div>
          <label className="block mb-2 font-semibold text-secondary">
            Professional Photo
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
          />
          {uploading && (
            <p className="text-blue-600 mt-1 text-sm font-medium">
              Uploading...
            </p>
          )}
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-2 font-semibold text-secondary">
            Years of Experience
          </label>
          <input
            type="number"
            {...register("experience", {
              required: "Experience is required",
              min: 0,
            })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g. 3"
          />
          {errors.experience && (
            <p className="text-red-600 mt-1 text-sm">
              {errors.experience.message}
            </p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="block mb-2 font-semibold text-secondary">
            Brief Biography
          </label>
          <textarea
            {...register("bio", { required: "Bio is required" })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Tell us a little about yourself..."
            rows={4}
          />
          {errors.bio && (
            <p className="text-red-600 mt-1 text-sm">{errors.bio.message}</p>
          )}
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-2 font-semibold text-secondary">
            Skills
          </label>
          <div className="flex flex-wrap gap-4">
            {skillsList.map((skill) => (
              <label
                key={skill}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  value={skill}
                  {...register("skills")}
                  className="accent-primary w-5 h-5"
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Available Days */}
        <div>
          <label className="block mb-2 font-semibold text-secondary">
            Available Days
          </label>
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
            <p className="text-red-600 mt-1 text-sm">
              {errors.availableDays.message}
            </p>
          )}
        </div>

        {/* Available Time */}
        <div>
          <label className="block mb-2 font-semibold text-secondary">
            Available Time
          </label>
          <input
            type="text"
            {...register("availableTime", { required: "Time is required" })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g. 4PM - 6PM"
          />
          {errors.availableTime && (
            <p className="text-red-600 mt-1 text-sm">
              {errors.availableTime.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="text-center mt-8">
          <button
            type="submit"
            disabled={!photoURL || uploading}
            className="bg-primary hover:bg-primary-dark  text-white font-semibold px-8 py-3 rounded-full shadow-lg transition"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default BeTrainer;
