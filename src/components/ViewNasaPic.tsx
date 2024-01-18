"use client";

import { NasaPicResp } from "@/types/nasa-pic-resp";
import Image from "next/image";
import { memo } from "react";

function ViewNasaPic({ pic }: { pic: NasaPicResp }) {
  return (
    <div className="px-3 py-6 flex flex-col gap-1 items-center rounded-md bg-slate-100 h-full">
      <h2 className="font-semibold text-lg text-center">{pic.title}</h2>
      <h2 className=" ">{pic.date}</h2>
      {pic.copyright && <h2 className=" ">©{pic.copyright}</h2>}

      {pic.media_type === "image" && (
        <div className="relative w-full mt-auto" style={{ height: 200 }}>
          <Image
            src={pic.url}
            layout="fill"
            alt={pic.title}
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
          />
        </div>
      )}
      {pic.media_type === "video" && (
        <iframe
          className="mt-auto w-full"
          height={200}
          src={pic.url}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
    </div>
  );
}

export default memo(ViewNasaPic);
