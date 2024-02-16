import { GetServerSideProps } from "next";
import React, { FC } from "react";

const TextBox: FC = (props) => {
  console.log("result", props);
  return <div>TextBox</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      harry: "harry",
    },
  };
};

export default TextBox;
