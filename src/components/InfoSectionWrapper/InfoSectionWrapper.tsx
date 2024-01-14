/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React, { useEffect } from "react";
import "./style.css";
import { Center } from "@mantine/core";
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { uid } from "uid";
interface Props {
  className: any;
}

export const InfoSectionWrapper = ({ className }: Props): JSX.Element => {

  async function onClick() {
    const dbRef = getDatabase()
    const uidGen = uid()
    const dataRef = ref(dbRef, '/users/'+localStorage.getItem('user')+'/Queue/'+uidGen);
    const dataRefQueue = ref(dbRef, '/queue/'+uidGen);
    const prompts = Object.values(JSON.parse(localStorage.getItem('prompts') || '[]')) || []
    const prompt = prompts[Math.floor(Math.random() * prompts.length)]
    console.log('prompt: ', prompt)
    if(prompt){
      const unixTimeSeconds = Math.floor(Date.now() / 1000)+90;
      const data = {
        time: unixTimeSeconds,
        prompt: prompt
      }
      set(dataRef, data).then(() => {
        console.log('Data written successfully!');
      }).catch((error) => {
        console.log('An error occurred:', error);
      });
      const dataQueue = {
        id: unixTimeSeconds,
        user: localStorage.getItem('user')
      }
      set(dataRefQueue, dataQueue).then(() => {
        console.log('Data written successfully to queue!');
      }).catch((error) => {
        console.log('An error occurred writing to queue:', error);
      });
  }
  }

  return (
    <div className={`info-section-wrapper ${className}`}
    onClick={() => onClick()}
    //change the style of the button when it is clicked
    onMouseDown={(e) => {
      e.currentTarget.style.backgroundColor = "#A95AB6";
    }}
    onMouseUp={(e) => {
      e.currentTarget.style.backgroundColor = "#613f8c";
    }}
    >
      <div>
      <img className="icon-phone" alt="Icon phone" src="https://svgshare.com/i/11vD.svg" />
      </div>
      <div style={{ textAlign: 'center', color: 'white', fontSize: '25px', fontFamily: 'Rubik', paddingTop:'15px' }}>
  90 second delay
    </div>
    </div>
  );
};
