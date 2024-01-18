"use client";

import { NasaPicResp } from "@/types/nasa-pic-resp";
import Image from "next/image";
import { memo, useState } from "react";
import CloseFullscreenOutlinedIcon from "@mui/icons-material/CloseFullscreenOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";

function ViewNasaPic({ pic }: { pic: NasaPicResp }) {
  const [isFullscreenOpened, setIsFullscreenOpened] = useState(false);
  console.warn(pic);
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
          <IconButton
            className="absolute top-1 right-1 text-white bg-black hover:text-black hover:bg-white"
            onClick={() => setIsFullscreenOpened(true)}
          >
            <FullscreenOutlinedIcon></FullscreenOutlinedIcon>
          </IconButton>
        </div>
      )}

      <Dialog
        open={isFullscreenOpened}
        onClose={() => setIsFullscreenOpened(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {isFullscreenOpened && (
          <div
            className="fixed"
            style={{
              width: "calc(100vw - 50px)",
              height: "calc(100vh - 50px)",
              top: 25,
              left: 25,
            }}
          >
            <Image
              className="w-screen h-screen"
              src={pic.hdurl}
              layout="fill"
              alt={pic.title}
              placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
              style={{ objectFit: "contain" }}
            />
            <IconButton
              className="absolute top-1 right-1 text-white bg-black hover:text-black hover:bg-white"
              onClick={() => setIsFullscreenOpened(false)}
            >
              <CloseFullscreenOutlinedIcon></CloseFullscreenOutlinedIcon>
            </IconButton>
          </div>
        )}
      </Dialog>
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
