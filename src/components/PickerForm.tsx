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
import Pagination from "@mui/material/Pagination";

type PaginationType = {
  page: number;
  typeOfPicker: "single" | "range";
  date: Dayjs | null;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
};

type props = {
  setPicture: (pic: NasaPicResp[] | null) => void;
  setError: (e: string) => void;
};
const minDateForApi = dayjs("Jun 16 1995");

export default function PickerForm({ setPicture, setError }: props) {
  const [totalPages, setTotalPages] = useState(1);

  const [pagination, setPagination] = useState<PaginationType>({
    typeOfPicker: "single",
    date: dayjs(),
    startDate: dayjs().subtract(7, "day"),
    endDate: dayjs(),
    page: 1,
  });

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

  const onPaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    console.warn(value);
    getPictureOFTheDay({ ...pagination, page: value });
  };

  const requestNewRange = async () => {
    const itemsCount = (endDate?.diff(startDate, "day") as number) + 1;
    setTotalPages(Math.ceil(itemsCount / 10));

    getPictureOFTheDay({ typeOfPicker, date, startDate, endDate, page: 1 });
  };

  const getPictureOFTheDay = useCallback(
    async ({
      typeOfPicker,
      date,
      startDate,
      endDate,
      page,
    }: PaginationType) => {
      setPagination({ typeOfPicker, date, startDate, endDate, page });
      setIsPicLoading(true);
      setPicture(null);

      const startDateOfPage = dayjs(startDate)
        .add((page - 1) * 10, "days")
        .format("YYYY-MM-DD");
      const startPlusTen = dayjs(startDate)
        .add(page * 9, "days")
        .format("YYYY-MM-DD");
      const EndDateOfPage =
        (endDate?.diff(startPlusTen, "day") as number) > 0
          ? startPlusTen
          : endDate?.format("YYYY-MM-DD");

      const body =
        typeOfPicker === "single"
          ? { date: date?.format("YYYY-MM-DD") }
          : {
              startDate: startDateOfPage,
              endDate: EndDateOfPage,
            };
      try {
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
    },
    [setError, setPicture]
  );

  useEffect(() => {
    requestNewRange();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="bg-white px-3 py-6 flex flex-col gap-3 items-center rounded-md">
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
            <FormControlLabel
              value="single"
              control={<Radio />}
              label="Single"
            />
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
              maxDate={
                !dateErrors.end ? endDate?.subtract(1, "day") : undefined
              }
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
          onClick={() => requestNewRange()}
        >
          Get Picture{typeOfPicker === "range" && "s"}
        </Button>
      </div>
      {pagination.typeOfPicker === "range" && (
        <div className="bg-white px-3 py-6 flex flex-col gap-3 items-center rounded-md">
          <p>
            Pictures listed {pagination.startDate?.format("YYYY-MM-DD")} -{" "}
            {pagination.endDate?.format("YYYY-MM-DD")}
          </p>
          <Pagination
            page={pagination.page}
            onChange={onPaginationChange}
            count={totalPages}
            variant="outlined"
          />
        </div>
      )}
    </LocalizationProvider>
  );
}
