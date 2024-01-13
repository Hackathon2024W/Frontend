import React from "react";
import { InfoSectionWrapper } from "../../components/InfoSectionWrapper";
import { PrimaryNavigation } from "../../components/PrimaryNavigation";
import "./style.css";

export const Home = (): JSX.Element => {
  return (
    <div className="home">
      <div className="div">
        <div className="overlap-group">
          <div className="ellipse" />
          <div className="rectangle" />
          <InfoSectionWrapper className="info-section" />
        </div>
        <div className="overlap">
          <div className="rectangle-2" />
          <PrimaryNavigation />
        </div>
        <div className="overlap-2">
          <div className="text-wrapper">Your Next Disruption:</div>
          <p className="call-min">
            Call :&nbsp;&nbsp;&nbsp;&nbsp;5:00 min
            <br />
            Message 8:00 min
          </p>
        </div>
        <img className="profile-picture" alt="Profile picture" src="/img/profile-picture.png" />
        <div className="text-wrapper-2">Ready to Leave?</div>
        <div className="text-wrapper-3">Welcome</div>
      </div>
    </div>
  );
};
