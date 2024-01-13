/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface Props {
  className: any;
}

export const InfoSectionWrapper = ({ className }: Props): JSX.Element => {
  return (
    <div className={`info-section-wrapper ${className}`}>
      <img className="icon-phone" alt="Icon phone" src="/img/icon-phone.png" />
    </div>
  );
};
