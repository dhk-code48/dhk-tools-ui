"use client";

import React, { FC, useState } from "react";
import { Input } from "../ui/input";
import { handleValidation } from "@/lib/handleValidation";
import { filesDataProp } from "@/lib/types/fileDataProp";
import { useStore } from "@/lib/store";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { fileProp } from "@/lib/types/fileProp";
import Link from "next/link";
import { FaFile } from "react-icons/fa";
import DownloadFile from "./DownloadFile";

const ValidateFileAccess: FC<{
  filesData: filesDataProp;
  files: fileProp[] | null;
}> = ({ filesData, files }) => {
  const { validateUser, state, unValidateUser } = useStore();

  const [password, setPassword] = useState<string>("");

  async function handleVal() {
    unValidateUser();

    try {
      if (password === filesData.attributes.password) {
        validateUser(); // Call the prop function on successful access
      } else {
        unValidateUser();
        toast({
          title: "Invalid Password !!",
          variant: "destructive",
          description:
            "The password you entered doesn't match the original one",
        });
      }
    } catch (error) {
      console.error("Error during password validation:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "An error occurred during password validation.",
      });
    }
  }

  return (
    <>
      {filesData.attributes.password && !state ? (
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Enter Password To Access</h1>
          <p className="text-muted-foreground">
            The content you are trying to access is password protected,
            <br /> enter the password in the input field below to continue
          </p>
          <Input
            type="password"
            placeholder="Enter Password ..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleVal}>Access</Button>
        </div>
      ) : (
        <div className="flex items-center text-center flex-col gap-2 mt-10">
          <h1 className="text-3xl font-bold">Download Files</h1>
          <p className="text-muted-foreground">
            dhk-tools is not responsbile if the file <br /> you are accessing
            contain viruses and other illegal stuff
          </p>
          <div className="my-5">
            {files !== null &&
              files.map((file, index) => {
                return (
                  <Link
                    href={"http://192.168.18.87:1337" + file.url}
                    target="_blank"
                    key={index}
                    className="flex items-center text-muted-foreground my-1 hover:underline"
                  >
                    <FaFile className="mr-2" />
                    {file.name}
                  </Link>
                );
              })}
            {files !== null && <DownloadFile filesInfo={files} />}
          </div>
        </div>
      )}
    </>
  );
};

export default ValidateFileAccess;
