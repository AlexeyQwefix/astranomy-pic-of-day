"use client";

import { NasaPicResp } from "@/types/nasa-pic-resp";
import Image from "next/image";
import { memo } from "react";

function ViewNasaPic({ pic }: { pic: NasaPicResp }) {
  console.warn(pic);
  return (
    <>
      <h2 className="font-semibold text-lg">{pic.title}</h2>
      <h2 className=" ">{pic.date}</h2>
      <h2 className=" ">©{pic.copyright}</h2>
      <Image src={pic.url} width={300} height={300} alt={pic.title} />
    </>
  );
}

export default memo(ViewNasaPic);
