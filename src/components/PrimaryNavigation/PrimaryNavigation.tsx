/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

interface PrimaryNavigationProps {
  setOpenTime: (isOpen: boolean) => void;
  setOpenPrompt: (isOpen: boolean) => void;
  setOpenHelp: (isOpen: boolean) => void;
}

export const PrimaryNavigation: React.FC<PrimaryNavigationProps> = ({ setOpenTime, setOpenPrompt, setOpenHelp }) => {

  return (
    <>
      <div className="navigation-container">
        <img className="primary-navigation" alt="Primary navigation" src="/img/primary-navigation.svg" />
        <div className="overlay-row">
          <img className="overlay-navigation prompt-navigation" alt="Prompt navigation" src="/img/Prompt.svg" onClick={() => setOpenPrompt(true)}/>
          <img className="overlay-navigation timer-navigation" alt="Timer navigation" src="/img/Timer.svg" onClick={() => setOpenTime(true)}/>
          <img className="overlay-navigation help-navigation" alt="Help navigation" src="/img/Help.svg" onClick={() => setOpenHelp(true)}/>
        
        </div>
      </div>
    </>
  );
};
