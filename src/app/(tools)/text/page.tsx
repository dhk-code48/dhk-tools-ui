"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import React, { FC } from "react";
import uuid from "react-uuid";
import { toast } from "@/components/ui/use-toast";
import Editor from "@/components/extras/Editor";
import { useRouter } from "next/navigation";

const WriteText: FC = () => {
  const [isProtected, setIsProtected] = useState<boolean>(false);
  const route = useRouter();
  const [password, setPassword] = useState<string>("");
  const [customUrl, setCusomUrl] = useState<string>("");
  const [editCode, setEditCode] = useState<string>("");
  const [content, setContent] = useState("");

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleSubmit = async () => {
    const data = {
      data: {
        content,
        url: customUrl,
        uid: uuid(),
        password,
        editCode,
      },
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/rich-texts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-cache",
      });

      if (res.ok) {
        toast({
          title: "Added Succesfullt",
          description: "Your new text has been added succesfully !!",
        });
        route.push("/text/" + customUrl);
      } else {
        console.log(res.status);
        toast({
          title: "Error While Adding !!",
          variant: "destructive",
          description: "There was an error while adding text, please try again !!",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error !",
        variant: "destructive",
        description: "Error while adding, Please check your network",
      });
    }
  };

  return (
    <div className="items-center space-y-5">
      <Editor handleEditorChange={handleEditorChange} />
      <div className="flex items-start gap-10">
        <div>
          <Input
            value={customUrl}
            onChange={(e) => setCusomUrl(e.target.value)}
            placeholder="Custom Url"
            className="w-auto"
          />
          <label
            className={`${
              customUrl.length < 5 || customUrl.length > 20 ? "text-red-500" : "text-green-500"
            } text-sm py-3 pl-1`}
          >
            Character Length : 5 - 20
          </label>
        </div>{" "}
        <div>
          <Input
            value={editCode}
            onChange={(e) => setEditCode(e.target.value)}
            placeholder="Edit Code"
            className="w-auto"
          />
          <label
            className={`${
              editCode.length < 3 || editCode.length > 20 ? "text-red-500" : "text-green-500"
            } text-sm py-3 pl-1`}
          >
            Character Length : 3 - 20
          </label>
        </div>
        <Button onClick={handleSubmit}>Save</Button>
      </div>
      <div className="flex gap-10">
        <h1>Password Protected</h1>
        <Switch onCheckedChange={(e) => setIsProtected(e)} />
      </div>
      {isProtected && (
        <div className="flex items-start gap-10">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Set New Password"
            className="w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default WriteText;
