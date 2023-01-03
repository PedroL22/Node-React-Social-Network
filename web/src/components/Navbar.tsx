import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../state";

export default function Navbar() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="navbar bg-violet-700 dark:bg-violet-800">
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-xl text-white dark:text-white"
          onClick={() => navigate("/")}
        >
          Node Social Network
        </a>
      </div>
      {user ? (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost normal-case">
              <p className="font-semibold text-lg mr-1 text-white dark:text-white">
                {user}
              </p>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between text-white dark:text-white">
                  Profile
                </a>
              </li>
              <li onClick={() => dispatch(setLogout())}>
                <a className="text-white dark:text-white">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div
          className="flex-none cursor-pointer text-white dark:text-white"
          onClick={() => navigate("/login")}
        >
          <p className="font-semibold text-lg mr-1 btn btn-ghost normal-case text-white dark:text-white">
            Login
          </p>
        </div>
      )}
    </div>
  );
}
