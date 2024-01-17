import { NasaPicResp } from "@/types/nasa-pic-resp";

type ParamsType = {
  date?: Date;
  startDate?: Date;
  endDate?: Date;
};

const fetchNasaImage = async (params?: ParamsType): Promise<NasaPicResp> => {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=L7TbFwD6owavSy9S36qxGVBOYoD7d0PVUYoyWJit`
  );
  return res.json();
};
export default fetchNasaImage;
