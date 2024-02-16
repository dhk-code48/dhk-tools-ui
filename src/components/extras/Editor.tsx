import React, { FC } from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Editor: FC<{
  handleEditorChange: (e: string) => void;
  defaultContent?: string | null;
}> = ({ handleEditorChange, defaultContent }) => {
  return (
    <SunEditor
      setContents={defaultContent || ""}
      onChange={handleEditorChange}
      setAllPlugins={true}
      setDefaultStyle="font-family:Merriweather; font-size:18px; line-height:32.8px"
      setOptions={{
        font: ["Merriweather"],
        buttonList: [
          ["font", "fontSize", "formatBlock"],
          ["fontColor", "hiliteColor", "textStyle"],
          ["paragraphStyle"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor"],
          ["removeFormat"],
          "/", // Line break
          ["outdent", "indent"],
          ["align", "horizontalRule", "list", "lineHeight"],
          ["table", "link", "image", "video", "audio"],
          ["fullScreen", "showBlocks", "codeView"],
          ["preview"],
          ["undo", "redo"],
        ],
      }}
    />
  );
};

export default Editor;
