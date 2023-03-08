import React from "react";
import { Position } from "../Game";

import "./circle.css";

interface Props {
  position?: Position;
}

const Circle: React.FC<Props> = ({ position }) => {
  const circleContainerClass =
    position === "left" ? "circle-container-left" : "circle-container-right";

  return (
    <div className={circleContainerClass}>
      <div className="circle" />;
    </div>
  );
};

export default Circle;
