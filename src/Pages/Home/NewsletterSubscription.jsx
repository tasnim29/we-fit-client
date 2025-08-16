import React, { use, useState } from "react";
import Swal from "sweetalert2";
import UseAxios from "../../Hooks/UseAxios";
import { AuthContext } from "../../Context/AuthContext/AuthContext";

const NewsletterSubscription = () => {
  const { theme } = use(AuthContext);
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
      console.error(error);
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
    <div
      className={`py-12 px-6 rounded-xl shadow-lg max-w-3xl mx-auto my-12 ${
        theme === "dark" ? "bg-gray-800" : "bg-primary/10"
      }`}
    >
      <h2
        className={`text-4xl font-bold text-center mb-4 ${
          theme === "dark" ? "text-white" : "text-primary"
        }`}
      >
        Subscribe to Our Newsletter
      </h2>
      <p
        className={`text-center mb-8 ${
          theme === "dark" ? "text-gray-300" : "text-primary/70"
        }`}
      >
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
          className={`w-full md:w-1/3 rounded border px-4 py-2 placeholder-opacity-60 focus:outline-none focus:ring-2 focus:border-transparent transition ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-primary"
              : "bg-white border-primary/50 text-primary placeholder-primary/60 focus:ring-primary"
          }`}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className={`w-full md:w-1/3 rounded border px-4 py-2 placeholder-opacity-60 focus:outline-none focus:ring-2 focus:border-transparent transition ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-primary"
              : "bg-white border-primary/50 text-primary placeholder-primary/60 focus:ring-primary"
          }`}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer md:w-auto bg-primary text-white font-semibold px-6 py-2 rounded shadow hover:bg-accent transition disabled:opacity-60"
        >
          {loading ? "Subscribing..." : "Subscribe Now"}
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
