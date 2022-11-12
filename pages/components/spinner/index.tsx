import React from "react";
import { Spinner } from "react-bootstrap";

const SpinnerCommon: React.FC = () => {
  return (
    <div className="spinner-bg">
      <div className="spinner-box">
        <Spinner animation="border" variant="warning" />
      </div>
    </div>
  );
};

export default SpinnerCommon;
