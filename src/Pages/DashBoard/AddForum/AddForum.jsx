import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { MessageCirclePlus } from "lucide-react";
import UseUserRole from "../../../Hooks/UseUserRole";
import { Helmet } from "react-helmet-async";

const AddForum = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user, theme } = use(AuthContext);
  const { role } = UseUserRole();

  const onSubmit = async (data) => {
    const forumPost = {
      title: data.title,
      image: data.image,
      description: data.description,
      authorName: user.displayName,
      authorEmail: user.email,
      role: role, // 'admin' or 'trainer'
    };

    try {
      await axiosSecure.post("/forums", forumPost);
      Swal.fire("Success", "Forum post created!", "success");
      reset();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not create forum post.", "error");
    }
  };

  return (
    <div>
      <Helmet>
        <title>WeFit | Add Forum</title>
      </Helmet>

      <div className="min-h-screen py-10 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <MessageCirclePlus className="text-primary w-6 h-6" />
          <h2
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Create a New Forum Post
          </h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Title */}
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Post Title
            </label>
            <input
              type="text"
              placeholder="Enter title"
              {...register("title", { required: true })}
              className={`w-full border rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Image URL
            </label>
            <input
              type="url"
              placeholder="Enter image URL"
              {...register("image", { required: true })}
              className={`w-full border rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              className={`block text-sm font-medium mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              Description
            </label>
            <textarea
              placeholder="Write your discussion or question here..."
              {...register("description", { required: true })}
              className={`w-full border rounded-xl px-4 py-2 shadow-sm min-h-[160px] focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition resize-none ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-accent cursor-pointer transition duration-300 hover:scale-105 text-white font-semibold px-8 py-3 rounded-lg"
            >
              Post to Forum
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForum;
