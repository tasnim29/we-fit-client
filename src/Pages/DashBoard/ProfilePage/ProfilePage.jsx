import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
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
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <Helmet>
        <title>WeFit | Profile</title>
      </Helmet>
      <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
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
          <label className="block mb-1 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Profile Picture URL
          </label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* Last login time */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Last Login
          </label>
          <p className="text-gray-800 font-medium">
            {user.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {/* Error message */}
        {error && <p className="text-red-600 font-medium">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={updating}
          className="w-full cursor-pointer bg-accent hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
