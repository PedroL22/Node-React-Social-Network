import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const notify = (notif: string) => toast.success(notif);
  const notifyError = (notif: string) => toast.error(notif);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      notifyError("Passwords do not match");
      return;
    }

    try {
      const registerResponse = await axios({
        method: "post",
        url: import.meta.env.VITE_SERVER_URL + "/register",
        data: { username, password },
      });

      const response = await registerResponse.data;

      if (response) {
        console.log(response);

        const loginAfterRegister = await axios({
          method: "post",
          url: import.meta.env.VITE_SERVER_URL + "/login",
          data: { username, password },
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const loginResponse = await loginAfterRegister.data;

        dispatch(
          setLogin({
            user: loginResponse.user,
            token: loginResponse.accessToken,
          })
        );
      }

      navigate("/");
    } catch (e: any) {
      notifyError(e.response.data);
      setPassword("");
      setPasswordConfirmation("");
    }
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="A social network made with Fastify, React, Redux, Tailwind CSS, DaisyUI, Material UI, and Prisma."
        />
        <meta
          name="keywords"
          content="Full, Stack, Developer, Pedro, Lucena, social, network, Fastify, React, Redux, Tailwind CSS, DaisyUI, Material UI, Prisma"
        />
        <meta name="author" content="Pedro Lucena" />
        <meta name="robots" content="index, follow" />
        <title>Register - React Node Social Network</title>
      </Helmet>
      <div className="bg-gray-200 dark:bg-gray-800 h-screen">
        <Navbar />
        <div className="bg-white dark:bg-gray-700 mx-auto w-96 p-10 py-12 mt-10 rounded-md shadow-md">
          <form onSubmit={handleRegister as any} className="flex flex-col">
            <h2 className="text-md text-center font-light uppercase text-gray-500 dark:text-gray-300">
              welcome
            </h2>
            <h1 className="text-xl text-center font-medium mb-7 dark:text-white">
              Create your account
            </h1>
            <div className="flex flex-col">
              <p className="text-sm mb-1 text-gray-600 dark:text-gray-200">
                Username
              </p>
              <input
                id="username"
                name="username"
                placeholder="Enter a unique username"
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
                placeholder="Enter a strong password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="bg-gray-200 p-2 rounded mb-2 outline-none border focus:border-gray-400 dark:border-none dark:bg-gray-600 dark:text-white"
              />
              <p className="text-sm mb-1 text-gray-600 dark:text-gray-200">
                Password confirmation
              </p>
              <input
                type="password"
                id="password-confirmation"
                name="password-confirmation"
                placeholder="Confirm your password"
                required
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
                className="bg-gray-200 p-2 rounded outline-none border focus:border-gray-400 dark:border-none dark:bg-gray-600 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700 dark:active:bg-violet-800 p-2 mt-5 rounded text-white font-medium transition-all duration-250 ease-in"
            >
              Register
            </button>
            <div className="flex mt-2 mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Already have an account?
              </p>
              <Link to="/login">
                <p className="text-sm ml-1 font-medium cursor-pointer hover:underline dark:text-white">
                  Login
                </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
