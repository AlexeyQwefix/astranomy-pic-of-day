"use client";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import fetchNasaImage from "@/requester/requester";
import { NasaPicResp } from "@/types/nasa-pic-resp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useCallback, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

type props = {
  setPicture: (pic: NasaPicResp[] | null) => void;
  setError: (e: string) => void;
};
const minDateForApi = dayjs("Jun 16 1995");

export default function PickerForm({ setPicture, setError }: props) {
  const [isPicLoading, setIsPicLoading] = useState(false);
  const [dateErrors, setDateErrors] = useState({
    start: false,
    end: false,
    single: false,
  });
  const [typeOfPicker, setTypeOfPicker] = useState<"single" | "range">(
    "single"
  );

  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().subtract(7, "day")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const typeOfDateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    if (type != "single" && type != "range") return;
    setTypeOfPicker(type);
  };

  const getPictureOFTheDay = useCallback(async () => {
    setIsPicLoading(true);

    const body =
      typeOfPicker === "single"
        ? { date: date?.format("YYYY-MM-DD") }
        : {
            startDate: startDate?.format("YYYY-MM-DD"),
            endDate: endDate?.format("YYYY-MM-DD"),
          };
    try {
      setPicture(null);
      const res = await fetchNasaImage(body);
      const error = typeof res === "string" ? res : undefined;
      if (error) {
        setError(error);
        return;
      }
      setPicture(res as NasaPicResp[]);
      setError("");
    } finally {
      setIsPicLoading(false);
    }
  }, [date, endDate, setError, setPicture, startDate, typeOfPicker]);

  useEffect(() => {
    getPictureOFTheDay();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Type of date picking
        </FormLabel>
        <RadioGroup
          value={typeOfPicker}
          onChange={typeOfDateHandler}
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="single"
          name="radio-buttons-group"
        >
          <FormControlLabel value="single" control={<Radio />} label="Single" />
          <FormControlLabel value="range" control={<Radio />} label="Range" />
        </RadioGroup>
      </FormControl>
      {typeOfPicker === "single" && (
        <DatePicker
          label="Pick date to see related picture"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          disableFuture
          minDate={minDateForApi}
          onError={(e) => setDateErrors({ ...dateErrors, single: !!e })}
        />
      )}
      {typeOfPicker === "range" && (
        <>
          <DatePicker
            label="Pick start date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            disableFuture
            maxDate={!dateErrors.end ? startDate : undefined}
            minDate={minDateForApi}
            onError={(e) => setDateErrors({ ...dateErrors, start: !!e })}
          />
          <DatePicker
            label="Pick end date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            disableFuture
            minDate={!dateErrors.start ? startDate?.add(1, "day") : undefined}
            onError={(e) => setDateErrors({ ...dateErrors, end: !!e })}
          />
        </>
      )}
      <Button
        disabled={
          isPicLoading ||
          (typeOfPicker === "single" && dateErrors.single) ||
          (typeOfPicker === "range" && (dateErrors.start || dateErrors.end))
        }
        variant="outlined"
        className="self-center"
        onClick={() => getPictureOFTheDay()}
      >
        Get Picture{typeOfPicker === "range" && "s"}
      </Button>
    </LocalizationProvider>
  );
}
