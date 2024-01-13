/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

interface Props {
  className: any;
}

export const InfoSection = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`info-section ${className}`}
      fill="none"
      height="268"
      viewBox="0 0 380 268"
      width="380"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="rect" fill="#8C7D9E" height="268" rx="50" width="380" />
    </svg>
  );
};
