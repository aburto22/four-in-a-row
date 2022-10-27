import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@hooks/redux";

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [loading, setLoading] = useState(true);
  const username = useAppSelector((state) => state.user.name);
  const { push } = useRouter();

  useEffect(() => {
    if (!username) {
      push("/");
      return;
    }
    setLoading(false);
  }, [username, push]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return children;
};

export default PrivateRoute;
