"use client";

import ClipLoader from "react-spinners/ClipLoader";
import Button from "@mui/material/Button";
import fetchNasaImage from "@/requester/requester";
import { NasaPicResp } from "@/types/nasa-pic-resp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

type props = {
  setPicture: (pic: NasaPicResp) => void;
};

export default function PickerForm({ setPicture }: props) {
  const [isPicLoading, setIsPicLoading] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  useEffect(() => console.log(date?.format("YYYY-MM-DD")), [date]);

  const getPictureOFTheDay = useCallback(
    async ({ date }: { date: Dayjs | null }) => {
      setIsPicLoading(true);
      if (!date) return;
      try {
        setPicture(await fetchNasaImage({ date: date?.format("YYYY-MM-DD") }));
      } catch (e) {
      } finally {
        setIsPicLoading(false);
      }
    },
    [setPicture]
  );
  useEffect(() => {
    getPictureOFTheDay({ date: dayjs() });
  }, [getPictureOFTheDay]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Pick date to see related picture"
        value={date}
        onChange={(newValue) => setDate(newValue)}
      />
      <Button
        disabled={isPicLoading}
        variant="outlined"
        className="self-center"
        onClick={() => getPictureOFTheDay({ date })}
      >
        Get Pic
      </Button>
    </LocalizationProvider>
  );
}
