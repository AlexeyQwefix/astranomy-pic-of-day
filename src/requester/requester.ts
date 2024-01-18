import { NasaPicResp } from "@/types/nasa-pic-resp";

type ParamsType = {
  date?: string;
  startDate?: string;
  endDate?: string;
};

const fetchNasaImage = async (
  params?: ParamsType
): Promise<NasaPicResp[]|  string> => {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=L7TbFwD6owavSy9S36qxGVBOYoD7d0PVUYoyWJit${
        params?.date ? "&date=" + params.date : ""
      }${
        params?.startDate && params?.endDate
          ? "&start_date=" + params.startDate + "&end_date=" + params.endDate
          : ""
      }`
    );
    if (!res.ok) {
      throw await res.json();
    }
    return [await res.json()].flat();
  } catch (e: any) {
    if (e?.msg) {
      return `${e.msg}`;
    }
    return "Unknown Error";
  }
};
export default fetchNasaImage;
