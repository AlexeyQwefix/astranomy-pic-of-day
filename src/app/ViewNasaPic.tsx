"use client";

import { NasaPicResp } from "@/types/nasa-pic-resp";
import Image from "next/image";
import { useState } from "react";

export default function ViewNasaPic({ pic }: { pic: NasaPicResp }) {
  console.warn(pic);
  return (
    <>
      <Image src={pic.url} width={900} height={675} alt={pic.title} />
    </>
  );
}
