import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "../../hooks/redux";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const username = useAppSelector((state) => state.user.name);
  const { push } = useRouter();

  if (!username) {
    push("/");
    return null;
  }

  return children;
};

export default PrivateRoute;
