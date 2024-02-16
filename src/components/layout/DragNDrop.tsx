"use client";
import React, { useState, DragEvent } from "react";
import { FaFile } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { handleUploadFile } from "@/strapi/Files/uploadFile"; // Update import

const DragNDrop: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]); // Change to array of files
  const [customUrl, setCusomUrl] = useState<string>("");
  const [isProtected, setIsProtected] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files); // Get all dropped files
    setDroppedFiles((prev) => [...prev, ...files]);
  };

  const handleUpload = () => {
    handleUploadFile(droppedFiles, customUrl, password).then(() =>
      window.location.reload()
    );
  };

  return (
    <>
      <div
        className={`p-4 border-dashed border-2 ${
          isDragging ? "bg-gray-100 text-black " : ""
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging ? "Drop files here" : "Drag and drop files here"}
        {droppedFiles.length > 0 && ( // Display dropped file details
          <div className="mt-4 border-t-2 pt-2">
            <h3 className="text-lg font-semibold">Dropped Files:</h3>
            <div className="text-muted-foreground">
              {droppedFiles.map((file, index) => (
                <div key={index} className="flex items-center">
                  <FaFile className="mr-2" />
                  {file.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="my-5">
        <Input
          value={customUrl}
          onChange={(e) => setCusomUrl(e.target.value)}
          placeholder="Custom Url"
          className="w-auto"
        />
        <label
          className={`${
            customUrl.length < 3 || customUrl.length > 20
              ? "text-red-500"
              : "text-green-500"
          } text-sm py-3 pl-1`}
        >
          Character Length : 3 - 20
        </label>
        <div className="flex gap-10 my-5">
          <h1>Password Protected</h1>
          <Switch onCheckedChange={(e) => setIsProtected(e)} />
        </div>
      </div>
      {isProtected && (
        <div className="flex mb-5 items-start gap-10">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Set New Password"
            className="w-auto"
          />
        </div>
      )}
      {droppedFiles.length > 0 && ( // Show upload options if files are dropped
        <>
          <div className="my-5">{/* Other input elements */}</div>
          <Button onClick={handleUpload}>Upload</Button>
        </>
      )}
    </>
  );
};

export default DragNDrop;
