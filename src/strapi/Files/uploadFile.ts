import { toast } from "@/components/ui/use-toast";
import uuid from "react-uuid";

const upload = async (file: File) => {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL;
    const form = new FormData();
    form.append("files", file, file.name);

    const uploadResponse = await fetch(`${url}/api/upload`, {
      method: "POST",
      body: form,
    });

    if (!uploadResponse.ok) {
      throw new Error("File upload failed");
    }

    const uploadData = await uploadResponse.json();
    const fileId = uploadData[0].id;

    return fileId;
  } catch (error) {
    console.error("Error:", error);
    return 0;
  }
};

export const handleUploadFile = async (files: File[], url: string, password: string) => {
  try {
    const uploadPromises = files.map((file) => upload(file));

    const filesId = await Promise.all(uploadPromises);

    const data = {
      data: {
        url: url,
        password: password,
        uid: uuid(),
        fileId: filesId,
      },
    };

    const dummyResponse = await fetch("http://localhost:1337/api/dhk-files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(data),
    });

    if (!dummyResponse.ok) {
      throw new Error("Dummy API request failed");
    }

    const dummyData = await dummyResponse.json();
    console.log("DOUBLE DATA => ", dummyData);
  } catch (error) {
    toast({
      title: "Invalid Url Name",
      variant: "destructive",
      description: "Url Must be unique",
    });
  }
};
