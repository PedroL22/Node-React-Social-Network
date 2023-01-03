import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notify = (notif: string) => toast.success(notif);
  const notifyError = (notif: string) => toast.error(notif);

  // check if the device is in dark mode
  function isDarkMode() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const loggedInResponse = await axios({
        method: "post",
        url: import.meta.env.VITE_SERVER_URL + "/login",
        data: { username, password },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const response = await loggedInResponse.data;

      if (response) {
        dispatch(
          setLogin({
            user: response.user,
            token: response.accessToken,
          })
        );
      }

      navigate("/");
    } catch (e: any) {
      notifyError(e.response.data);
      setPassword("");
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-800 h-screen">
      <Navbar />
      <div className="bg-white dark:bg-gray-700 mx-auto w-96 p-10 py-12 mt-10 rounded-md shadow-md">
        <form onSubmit={handleLogin as any} className="flex flex-col">
          <h2 className="text-md text-center font-light uppercase text-gray-500 dark:text-gray-300">
            welcome back
          </h2>
          <h1 className="text-xl text-center font-medium mb-7 dark:text-white">
            Log into your account
          </h1>
          <div className="flex flex-col">
            <p className="text-sm mb-1 text-gray-600 dark:text-gray-200">
              Username
            </p>
            <input
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="bg-gray-200 p-2 rounded mb-2 outline-none border focus:border-gray-400 dark:border-none dark:bg-gray-600 dark:text-white"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm mb-1 text-gray-600 dark:text-gray-200">
              Password
            </p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-gray-200 p-2 rounded outline-none border focus:border-gray-400 dark:border-none dark:bg-gray-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700 dark:active:bg-violet-800 p-2 mt-5 rounded text-white font-medium transition-all duration-250 ease-in"
          >
            Sign in
          </button>
          <div className="flex mt-2 mb-3">
            <p className="text-sm text-gray-600 dark:text-gray-200">
              Not registered yet?
            </p>
            <p className="text-sm ml-1 font-medium cursor-pointer hover:underline dark:text-white">
              Register
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
