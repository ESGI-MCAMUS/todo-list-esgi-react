import * as React from "react";
import { Navigate } from "react-router-dom";

interface LogoutProps {}

export const Logout: React.FunctionComponent<LogoutProps> = ({}) => {
  React.useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }, []);
  return <Navigate replace to={"/"} />;
};
