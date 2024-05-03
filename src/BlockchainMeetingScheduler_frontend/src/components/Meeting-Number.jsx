import React from 'react';
import './styles/meeting-number.scss'

function MeetingNumber() {
    const meetingName = "ble ble ble"
    const meetingDescription = "a main goal of the meeting is to say something ambicious"
    const arrOfSelectedDays = [{'year':2024, 'month':5, 'day':11},{'year':2024, 'month':5, 'day':12},{'year':2024, 'month':5, 'day':13}];
    const lenArrOfSelectedDays = arrOfSelectedDays.length;
    const startHour = 6;
    const endHour = 22;
    const halfHours = (endHour - startHour) * 2;

return(
    <div>
        <header class="sticky navbar bg-light">
                <img class="logoBMS" src="/BMS_Logo_Green.png"/>
        </header>
        <div class="container center">
            <div class="container center mb-10">
                <h1 class="topH1">{meetingName}</h1>
                <p>{meetingDescription}</p>
                <p>here you can choose and check your availability</p>
            </div>
            <div style={{gridColumnGap: '20px', marginTop:'4%', display:'grid' ,gridTemplateColumns: `repeat(${lenArrOfSelectedDays}, 1fr)`}}>
                {   
                    [...Array(lenArrOfSelectedDays).keys()].map((day) => (
                        <div className={`grid-day`}>
                        {}
                        {
                            [...Array(halfHours).keys()].map((half) => (
                                <div class="grid-halfHour">{day},{half}</div>
                            ))
                        }
                        </div>))
                }
            </div>
        </div>
    </div>
);
    
}

export default MeetingNumber;