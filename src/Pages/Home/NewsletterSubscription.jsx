import React, { useState } from "react";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks/UseAxios";

const NewsletterSubscription = () => {
  const axiosInstance = UseAxios();
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const { name, email } = formData;

    if (!name || !email) {
      Swal.fire(
        "Missing fields",
        "Please provide both name and email",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post("/newsletter", { name, email });
      if (res.data.insertedId) {
        Swal.fire(
          "Subscribed!",
          "You have successfully subscribed to our newsletter.",
          "success"
        );
        setFormData({ name: "", email: "" });
      }
    } catch (error) {
      console.log(error);
      Swal.fire(
        "Error",
        "Failed to subscribe. Please try again later.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 py-12 px-6 rounded-xl shadow-lg max-w-3xl mx-auto mt-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Get the latest updates, tips, and insights delivered straight to your
        inbox.
      </p>

      <form
        onSubmit={handleSubscribe}
        className="flex flex-col md:flex-row gap-4 justify-center items-center"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="input input-bordered w-full md:w-1/3 rounded px-4 py-2 border border-gray-300 focus:outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="input input-bordered w-full md:w-1/3 rounded px-4 py-2 border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
        >
          {loading ? "Subscribing..." : "Subscribe Now"}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
