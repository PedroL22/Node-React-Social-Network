import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import axios from "axios";
import Navbar from "../components/Navbar";

interface Post {
  id: string;
  text: string;
  usersId: string;
}

interface Posts {
  posts: Post[];
}

export default function Home() {
  const { data, isFetching } = useQuery<Posts>(["post list"], async () => {
    const response = await axios({
      method: "get",
      url: import.meta.env.VITE_SERVER_URL + "/",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return { ...response.data };
  });

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
        <title>React Node Social Network</title>
      </Helmet>
      <div className="bg-gray-200 h-screen">
        <Navbar />
        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <div>
            {data?.posts?.map((item) => (
              <div>{item.text}</div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
