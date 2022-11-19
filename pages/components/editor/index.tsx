import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const quillModuls = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      ["link", "image"],
      ["clean"], // remove formatting button
    ],
  },
};

interface Prop {
  onChange?: (e: string) => void;
  // onChange?: (e: string, trigger: boolean) => void;
  errorMessage?: string;
  value?: string;
}
const Editor: React.FC<Prop> = ({ onChange, errorMessage, value }) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className={errorMessage && "error-editor"}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={quillModuls}
      />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Editor;
