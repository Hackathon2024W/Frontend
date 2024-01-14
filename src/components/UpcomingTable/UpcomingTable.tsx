import React, { useEffect, useState } from 'react';

import 'firebase/database';
import { getDatabase, ref, onValue, set, get } from 'firebase/database';
import { uid } from 'uid';
export const UpcomingTable: React.FC = () => {
    const [items, setItems] = useState([{time: 0, prompt: ''}]);

    interface QueueItem {
        prompt: string;
        time: number;
    }

        async function getList(){
            const dbRef = getDatabase()
            const userId = localStorage.getItem('user')
            try {
                const snapshot = await get(ref(dbRef, `/users/${userId}/Queue/`));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    // Assuming the data contains 'prompt' and 'time' properties
                    
                    return data;
                } else {
                    throw new Error('No data available');
                }
            } catch (error) {
                throw new Error(`Error fetching data: ${error}`);
            }
        }

        useEffect(() => {
            async function fetchData() {
                try {
                    const result = await getList();
                    // Assuming result is an object with keys mapping to QueueItem objects
                    const resultArray: QueueItem[] = Object.values(result as Record<string, QueueItem>);
                    resultArray.forEach(element => {
                        // if(element.time < Math.floor(Date.now() / 1000)){
                        //     const dbRef = getDatabase()
                        //     const userId = localStorage.getItem('user')
                        //     const dataRef = ref(dbRef, `/users/${userId}/Queue/`);
                        //     set(dataRef, null).then(() => {
                        //         console.log('Data written successfully!');
                        //     }).catch((error) => {
                        //         console.log('An error occurred:', error);
                        //     });
                        // }
                    });
                    setItems(resultArray);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            }
            fetchData();
        }, );



        function unixToTimeFormat(unixTime: number): string {
            if(unixTime === 0) return ('No Calls Scheduled');
            const date = new Date(unixTime * 1000);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
            const seconds = "0" + date.getSeconds();
            return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        }

    return (
        <div className='call-min'>
            Next Call Time:
        {items.map((item, index) => (
            <div className = "promptText"
            key={index}>
                {item.prompt} - {unixToTimeFormat(item.time)}
            </div>
        ))}
        </div>
    );
};

export default UpcomingTable;
