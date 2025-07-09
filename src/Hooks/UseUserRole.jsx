import { useQuery } from "@tanstack/react-query";

import UseAxiosSecure from "./UseAxiosSecure";
import { use } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";

const UseUserRole = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const {
    data: role,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email && !loading, // only run when user is loaded
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });

  return { role, isLoading, refetch };
};

export default UseUserRole;
