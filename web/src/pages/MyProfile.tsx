import React from "react";
import { useSelector } from "react-redux";

export default function MyProfile() {
  const user = useSelector((state: any) => state.user);

  return <div>{user}</div>;
}
