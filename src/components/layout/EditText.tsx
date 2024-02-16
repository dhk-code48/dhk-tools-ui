"use client";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import React, { FC, useEffect, useState } from "react";
import { toast } from "../ui/use-toast";

import "suneditor/dist/css/suneditor.min.css";
import Editor from "../extras/Editor";
import { Button } from "../ui/button";
import { textProps } from "@/lib/types/textProp";

import { handleValidation } from "@/lib/handleValidation";
import { useStore } from "@/lib/store";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["300", "400", "900", "700"],
  style: ["italic", "normal"],
  display: "swap",
  subsets: ["latin"],
});

const EditText: FC<{ data: textProps }> = ({ data }) => {
  const [userEditCode, setEditCode] = useState<string>("");
  const [editable, setEditable] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleEditableState(state: boolean) {
    if (userEditCode === data.attributes.editCode) {
      setEditable(state);
    } else {
      toast({
        title: "Wrong Edit Code !!",
        variant: "destructive",
        description: "Code you have written doesn't match with the original one",
      });
    }
  }
  useEffect(() => {
    if (editable && userEditCode === data.attributes.editCode) {
      setEditable(true);
    } else {
      setEditable(false);
    }
  }, [editable, data.attributes.editCode]);

  function handleEditorChange(content: string) {
    setEditedContent(content);
  }

  const handleContentEdit = async () => {
    const editedData = {
      data: {
        content: editedContent,
        url: data.attributes.url,
        uid: data.attributes.uid,
        password: data.attributes.password,
      },
    };

    try {
      const res = await fetch(`http://192.168.18.87:1337/api/rich-texts/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
        cache: "no-cache",
      });

      if (res.ok) {
        toast({
          title: "Edited Succesfullt",
          description: "Your new text has been edited succesfully !!",
        });
        window.location.reload();
      } else {
        toast({
          title: "Error While Editing !!",
          variant: "destructive",
          description: "There was an error while editing text, please try again !!",
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

  const validateUser = useStore((state) => state.validateUser);
  const unValidateUser = useStore((state) => state.unValidateUser);
  const state = useStore((state) => state.state);

  async function handleVal() {
    try {
      const isValidPassword = await handleValidation(password, data.attributes.password);

      console.log("ISVALIDPASSWORD :- ", isValidPassword);

      if (isValidPassword) {
        validateUser(); // Call the prop function on successful access
      } else {
        unValidateUser();
        toast({
          title: "Invalid Password !!",
          variant: "destructive",
          description: "The password you entered doesn't match the original one",
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

  useEffect(() => {
    console.log("My State = ", state, data.attributes.password);
  }, [state]);

  return (
    <>
      {data.attributes.password && !state ? (
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">Enter Password To Access</h1>
          <p className="text-muted-foreground">
            The content you are trying to access is password protected,
            <br /> enter the password in the input field below to continue
          </p>
          <Input
            type="password" // Mask the entered password
            placeholder="Enter Password ..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleVal}>Access</Button>
        </div>
      ) : (
        <>
          {" "}
          {editable ? (
            <>
              <div className={merriweather.className}>
                <Editor
                  handleEditorChange={handleEditorChange}
                  defaultContent={data.attributes.content}
                />
              </div>
              <Button onClick={handleContentEdit}>Edit Changes</Button>
              <Button variant={"outline"} className="ml-5" onClick={() => setEditable(false)}>
                Read Mode
              </Button>
            </>
          ) : (
            <p dangerouslySetInnerHTML={{ __html: data.attributes.content }}></p>
          )}
          {!editable && (
            <div className="flex gap-4 items-center">
              <Input
                value={userEditCode}
                onChange={(e) => setEditCode(e.target.value)}
                placeholder="Edit Code"
                className="w-auto"
              />
              <Switch checked={editable} onCheckedChange={handleEditableState} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EditText;
