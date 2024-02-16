"use client";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { handleDownload } from "@/strapi/Files/downloadFiles";
import { fileProp } from "@/lib/types/fileProp";

const DownloadFile: FC<{ filesInfo: fileProp[] | null }> = ({ filesInfo }) => {
  return <Button onClick={() => handleDownload(filesInfo)}>Download</Button>;
};

export default DownloadFile;
