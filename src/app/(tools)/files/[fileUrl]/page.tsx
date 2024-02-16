import DownloadFile from "@/components/layout/DownloadFile";
import ValidateFileAccess from "@/components/layout/ValidateFileAccess";
import { Button } from "@/components/ui/button";
import { generateFileLink } from "@/lib/generateFileUrl";
import { filesDataProp } from "@/lib/types/fileDataProp";
import { handleDownload } from "@/strapi/Files/downloadFiles";
import { getFilesData } from "@/strapi/Files/getFileData";
import { getFiles } from "@/strapi/Files/getFiles";
import Link from "next/link";
import { Input } from "postcss";
import React, { FC } from "react";
import { FaFile } from "react-icons/fa";

interface pageProps {
  params: {
    fileUrl: string;
  };
}

const FilesInfo: FC<pageProps> = async ({ params }) => {
  const filesData: filesDataProp | null = await getFilesData(params.fileUrl);
  const files = await getFiles(
    filesData !== null ? generateFileLink(filesData.attributes.fileId) : null
  );

  return (
    <>
      {filesData !== null && files && (
        <ValidateFileAccess filesData={filesData} files={files} />
      )}
    </>
  );
};

export default FilesInfo;
