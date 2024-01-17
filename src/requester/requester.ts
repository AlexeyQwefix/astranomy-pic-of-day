const fetchNasaImage = async (
  params?: {
    date?: Date;
    startDate?: Date;
    endDate?: Date;
  }
) => {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=L7TbFwD6owavSy9S36qxGVBOYoD7d0PVUYoyWJit`
  );
  return res.json();
};
export default fetchNasaImage;
