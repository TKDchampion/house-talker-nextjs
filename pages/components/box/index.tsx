import React from "react";

interface Props {
  children?: React.ReactNode;
}

const Box: React.FC<Props> = ({ children }) => {
  return (
    <div className="body-box">
      <div className="card-body p-3">{children}</div>
    </div>
  );
};

export default Box;
