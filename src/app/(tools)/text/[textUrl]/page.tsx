"use client";
import { getData } from "@/strapi/Text/getTextData";
import EditText from "@/components/layout/EditText";
import { textProps } from "@/lib/types/textProp";
import React, { FC, useEffect, useState } from "react";

interface pageProps {
  params: {
    textUrl: string;
  };
}

const TextRead: FC<pageProps> = ({ params }) => {
  const [data, setData] = useState<textProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const textData = await getData(params.textUrl);
        setData(textData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.textUrl]);

  return (
    <div>
      {data && (
        <div className="space-y-10 items-center">
          <EditText data={data} />
        </div>
      )}
    </div>
  );
};

export default TextRead;
