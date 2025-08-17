import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  const { user, updateUser, theme } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");

    try {
      await updateUser({
        displayName: name,
        photoURL: photoURL,
      });
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Profile update failed:", err);
      setError("Failed to update profile.");
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an error updating your profile.",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className={`max-w-7xl mx-auto py-10 px-4 `}>
      <Helmet>
        <title>WeFit | Profile</title>
      </Helmet>
      <h2
        className={`text-3xl font-bold mb-8 text-center ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Your Profile
      </h2>

      {/* Profile Picture Preview */}
      <div className="flex justify-center mb-6">
        <img
          src={
            photoURL
              ? photoURL
              : "https://via.placeholder.com/150?text=No+Image"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email (read-only) */}
        <div>
          <label
            className={`block mb-1 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className={`w-full p-3 border rounded-lg cursor-not-allowed ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600 text-gray-400"
                : "bg-gray-100 border-gray-300 text-gray-500"
            }`}
          />
        </div>

        {/* Name */}
        <div>
          <label
            className={`block mb-1 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>

        {/* Photo URL */}
        <div>
          <label
            className={`block mb-1 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Profile Picture URL
          </label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900"
            }`}
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* Last login time */}
        <div>
          <label
            className={`block mb-1 font-semibold ${
              theme === "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            Last Login
          </label>
          <p
            className={`font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-800"
            }`}
          >
            {user.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* Error message */}
        {error && <p className="text-red-600 font-medium">{error}</p>}

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            disabled={updating}
            className="bg-accent cursor-pointer transition duration-300 hover:scale-105 text-white font-semibold px-8 py-3 rounded-lg"
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
