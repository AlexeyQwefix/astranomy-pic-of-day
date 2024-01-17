"use client";

import Image from "next/image";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "@mui/material/Button";
import fetchNasaImage from "@/requester/requester";

export default function Home() {
  const [isPicLoading, setIsPicLoading] = useState(false);

  const getPictureOFTheDay = async () => {
    console.warn("hello");
    fetchNasaImage()
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 ">
      <div className="w-full max-w-screen-xl flex flex-col items-stretch gap-6">
        <h1 className="bg-white px-3 py-6 text-xl font-bold text-center rounded-md">
          UI Astronomy Picture of the day
        </h1>
        <DatePicker label="Basic date picker" />
        <Button
          variant="outlined"
          className="self-center"
          onClick={getPictureOFTheDay}
        >
          Get Pic
        </Button>
        <ClipLoader></ClipLoader>
      </div>
    </main>
  );
}
