import React, { FC } from "react";
import "./feedback-label.css";

export type FeedbackText = "Success" | "Wrong Key" | "Too Soon" | "Too Late";

type LabelProps = {
  text: FeedbackText;
};

const FeedbackLabel: React.FC<LabelProps> = ({ text }) => {
  const labelClasses = text === "Success" ? "label success" : "label failed";

  return <label className={labelClasses}>{text}</label>;
};

export default FeedbackLabel;
