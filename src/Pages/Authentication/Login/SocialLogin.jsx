import React, { use } from "react";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import UseAxios from "../../../Hooks/UseAxios";

const SocialLogin = () => {
  const { googleSignIn } = use(AuthContext);
  const axiosInstance = UseAxios();
  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignIn();
      const user = result.user;

      // update profile in database
      const userInformation = {
        email: user?.email,
        role: "member",
      };

      const res = await axiosInstance.post("/users", userInformation);
      console.log("social login", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        onClick={handleGoogleLogin}
        aria-label="Login with Google"
        type="button"
        className="flex items-center justify-center w-full p-3 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 bg-accent cursor-pointer transition duration-300 hover:scale-105 text-white font-semibold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5 "
        >
          <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
        </svg>
        <p>Login with Google</p>
      </button>
    </div>
  );
};

export default SocialLogin;
