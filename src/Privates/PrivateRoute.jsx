import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <p>loading...</p>;
  }
  if (!user) {
    return <Navigate state={location.pathname} to="/login" />;
  }
  return children;
};

export default PrivateRoute;
