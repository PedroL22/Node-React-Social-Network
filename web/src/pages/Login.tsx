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
    }
  };

  return (
    <div className="bg-gray-200 h-screen">
      <Navbar />
      <div className="bg-white mx-auto w-96 p-10 mt-10 rounded-md shadow-md">
        <form onSubmit={handleLogin as any} className="flex flex-col">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-200 p-3 rounded mt-2 outline-none border focus:border-gray-400"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-200 p-3 rounded mt-2 outline-none border focus:border-gray-400"
          />
          <button
            type="submit"
            className="bg-green-300 hover:bg-green-400 active:bg-green-500 p-2 mt-2 rounded text-white transition-all duration-250 ease-in"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
