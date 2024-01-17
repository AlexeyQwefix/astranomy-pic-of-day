import { NasaPicResp } from "@/types/nasa-pic-resp";

type ParamsType = {
  date?: string;
  startDate?: string;
  endDate?: string;
};

const fetchNasaImage = async (params?: ParamsType): Promise<NasaPicResp> => {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=L7TbFwD6owavSy9S36qxGVBOYoD7d0PVUYoyWJit&${
      params?.date && "&date=" + params.date
    }`
  );
  return res.json();
};
export default fetchNasaImage;
