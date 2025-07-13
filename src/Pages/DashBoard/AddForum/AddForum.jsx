import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { MessageCirclePlus } from "lucide-react";
import UseUserRole from "../../../Hooks/UseUserRole";

const AddForum = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = UseAxiosSecure();
  const { user } = use(AuthContext);
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
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-10 w-full">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <MessageCirclePlus className="text-primary w-6 h-6" />
            <h2 className="text-3xl font-semibold text-gray-800">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Post Title
              </label>
              <input
                type="text"
                placeholder="e.g., How to improve endurance?"
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                {...register("image", { required: true })}
                className="input input-bordered w-full"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Write your discussion or question here..."
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full min-h-[160px]"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-full shadow transition"
              >
                Post to Forum
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForum;
