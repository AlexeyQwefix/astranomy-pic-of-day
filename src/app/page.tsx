"use client";

import Image from "next/image";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Button from "@mui/material/Button";
import fetchNasaImage from "@/requester/requester";
import { NasaPicResp } from "@/types/nasa-pic-resp";
import ViewNasaPic from "./ViewNasaPic";

export default function Home() {
  const [isPicLoading, setIsPicLoading] = useState(false);
  const [picture, setPicture] = useState<NasaPicResp | null>(null);

  const getPictureOFTheDay = async () => {
    setIsPicLoading(true);
    try {
      setPicture(await fetchNasaImage());
    } catch (e) {
    } finally {
      setIsPicLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 ">
      <div className="w-full max-w-screen-xl flex flex-col items-stretch gap-6">
        <h1 className="bg-white px-3 py-6 text-xl font-bold text-center rounded-md">
          UI Astronomy Picture of the day
        </h1>
        <div className="bg-white px-3 py-6 flex flex-wrap gap-1 items-center rounded-md">
          <Button
            disabled={isPicLoading}
            variant="outlined"
            className="self-center"
            onClick={getPictureOFTheDay}
          >
            Get Pic
          </Button>
          {isPicLoading && <ClipLoader></ClipLoader>}
        </div>
        {!!picture && (
          <div className="bg-white px-3 py-6 flex flex-col gap-1 items-center rounded-md">
            <ViewNasaPic pic={picture}></ViewNasaPic>
          </div>
        )}
      </div>
    </main>
  );
}
