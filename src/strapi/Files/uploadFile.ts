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

export const handleUploadFile = async (files: File[], customUrl: string, password: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_STRAPI_URL;

    const uploadPromises = files.map((file) => upload(file));

    const filesId = await Promise.all(uploadPromises);

    const data = {
      data: {
        url: customUrl,
        password: password,
        uid: uuid(),
        fileId: filesId,
      },
    };

    const dummyResponse = await fetch(`${url}/api/dhk-files`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(dummyResponse.status);
    console.log(dummyResponse.statusText);
    if (!dummyResponse.ok) {
      throw new Error("Dummy API request failed");
    }

    const dummyData = await dummyResponse.json();
    console.log("DOUBLE DATA => ", dummyData);
  } catch (error) {
    console.log("error => ", error);
    toast({
      title: "Invalid Url Name",
      variant: "destructive",
      description: "Url Must be unique",
    });
  }
};
