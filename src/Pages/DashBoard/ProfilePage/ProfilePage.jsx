import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import Swal from "sweetalert2";

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
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      {/* Profile Picture Preview */}
      <div className="flex justify-center mb-6">
        <img
          src={
            photoURL
              ? photoURL
              : "https://via.placeholder.com/150?text=No+Image"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border border-gray-300"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email (read-only) */}
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block mb-1 font-semibold">
            Profile Picture URL
          </label>
          <input
            type="url"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        {/* Last login time (from user metadata) */}
        <div>
          <label className="block mb-1 font-semibold">Last Login</label>
          <p className="text-gray-700">
            {user.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleString()
              : "N/A"}
          </p>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={updating}
          className="btn btn-primary w-full"
        >
          {updating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
