"use client";

import { useCallback, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { NasaPicResp } from "@/types/nasa-pic-resp";
import ViewNasaPic from "../components/ViewNasaPic";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PickerForm from "@/components/PickerForm";

export default function Home() {
  const [pictures, setPictures] = useState<NasaPicResp[] | null>(null);
  const [error, setError] = useState("");

  const setPictureCallback = useCallback(setPictures, [setPictures]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main className="flex min-h-screen flex-col items-center p-6 ">
        <div className="w-full max-w-screen-xl flex flex-col items-stretch gap-6">
          <h1 className="bg-white px-3 py-6 text-xl font-bold text-center rounded-md">
            UI Astronomy Picture of the day
          </h1>
          
            <PickerForm
              setPicture={setPictureCallback}
              setError={setError}
            ></PickerForm>
          
          <div
            className="bg-white px-3 py-6 grid auto-cols-auto gap-1 items-center justify-center rounded-md"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(100px,350px)) ",
            }}
          >
            {!!pictures && pictures.length ? (
              pictures.map((p) => (
                <ViewNasaPic key={p.date} pic={p}></ViewNasaPic>
              ))
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <ClipLoader className="mx-auto"></ClipLoader>
            )}
          </div>
        </div>
      </main>
    </LocalizationProvider>
  );
}
