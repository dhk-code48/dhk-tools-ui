import DragNDrop from "@/components/layout/DragNDrop";
import React from "react";

const Files = () => {
  return (
    <div className="mt-5">
      <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Upload and share
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-3 text-muted-foreground">
        Effortlessly Distribute Files to Your Network: Seamlessly share
        documents with your associates, loved ones, and colleagues, facilitating
        easy downloads with a single, convenient click.
      </p>
      <DragNDrop />
    </div>
  );
};

export default Files;
