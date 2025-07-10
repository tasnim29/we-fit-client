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
      description: data.description,
      authorName: user.displayName,
      authorEmail: user.email,
      role: role, // 'admin' or 'trainer'
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/forums", forumPost);
      Swal.fire("Success", "Forum post created!", "success");
      reset();
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Could not create forum post.", "error");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <MessageCirclePlus className="text-primary w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-800">
            Create a New Forum Post
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Post Title</label>
            <input
              type="text"
              placeholder="e.g., How to improve endurance?"
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              placeholder="Write your discussion or question here..."
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full h-40"
            />
          </div>

          <button
            className="btn btn-primary w-full rounded-full shadow-md hover:shadow-lg transition"
            type="submit"
          >
            Post to Forum
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddForum;
