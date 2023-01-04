import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";

export default function Home() {
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
      </div>
    </>
  );
}
