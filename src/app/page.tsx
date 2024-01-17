"use client";

import { useCallback, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { NasaPicResp } from "@/types/nasa-pic-resp";
import ViewNasaPic from "../components/ViewNasaPic";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PickerForm from "@/components/PickerForm";

export default function Home() {
  
  const [picture, setPicture] = useState<NasaPicResp | null>(null);


  const setPictureCallback = useCallback(setPicture, [setPicture]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <main className="flex min-h-screen flex-col items-center p-6 ">
        <div className="w-full max-w-screen-xl flex flex-col items-stretch gap-6">
          <h1 className="bg-white px-3 py-6 text-xl font-bold text-center rounded-md">
            UI Astronomy Picture of the day
          </h1>
          <div className="bg-white px-3 py-6 flex flex-col gap-3 items-center rounded-md">
            <PickerForm
              setPicture={setPictureCallback}
            ></PickerForm>
          </div>
          <div className="bg-white px-3 py-6 flex flex-col gap-1 items-center rounded-md">
            {!!picture ? (
              <ViewNasaPic pic={picture}></ViewNasaPic>
            ) : (
              <ClipLoader></ClipLoader>
            )}
          </div>
        </div>
      </main>
    </LocalizationProvider>
  );
}
