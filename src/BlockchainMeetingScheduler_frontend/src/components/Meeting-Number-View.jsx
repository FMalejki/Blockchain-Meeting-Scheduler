import React, {useState, useEffect} from 'react';
import './styles/meeting-number.scss'

function MeetingNumberView() {
    //hoovering check
    const [isHover, setIsHover] = useState([]);
    //end

    //data about users collected from backend
    const usersData = [
        {'user' : 'F3NDYs', 'availability' : [[2,3,4,5,6,13,14,15,16],[5,6,7,8,9,10,11],[11,12,13,14,15,16]]},
        {'user' : 'SCHWARZ', 'availability' : [[2,3,14,15,16],[5,6,7,11],[11,15,16]]},
        {'user' : 'BRUNO', 'availability' : [[14,15,16,17,18],[7,8,9,10,11,12,13,14],[7,8,9,10,11,12,13]]}
    ];
    //end
    //data collected from backend:
    const meetingName = "AGH BLOCKCHAIN MEETUP";
    const meetingDescription = "a main goal of the meeting is to say something ambicious";
    const arrOfSelectedDays = [{'year':2024, 'month':5, 'day':11},{'year':2024, 'month':5, 'day':12},{'year':2024, 'month':5, 'day':13}];
    //end
    const [isSubmitting, setIsSubmitting] = useState(false);
    const lenArrOfSelectedDays = arrOfSelectedDays.length;
    const startHour = 6;
    const endHour = 22;
    const halfHours = (endHour - startHour) * 2;
    const iter = 0;
    //hoovering check functions
    const mouseOverObject = (index) => {
        if(isMouseDown){
            if(!isHover[index]){
                setIsHover((prevState) => {
                    const newState = [...prevState];
                    newState[index] = true;
                    return newState;      
                });
            }
            else{
                setIsHover((prevState) => {
                    const newState = [...prevState];
                    newState[index] = false;
                    return newState;      
                });
            }
        }
    };


    const mouseOverObjectExit = (index) => {
        setIsHover((prevState) => {
            const newState = [...prevState];
            newState[index] = false;
            return newState;      
        });
    };

    const handleClickOnObject = (index) =>{
        if(!isHover[index]){
            setIsHover((prevState) => {
                const newState = [...prevState];
                newState[index] = true;
                return newState;      
            });
        }
        else{
            setIsHover((prevState) => {
                const newState = [...prevState];
                newState[index] = false;
                return newState;      
            });
        }
    };
       

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
            <div style={{
                gridColumnGap: '20px',
                gridRowGap: '20px',
                marginTop:'4%',
                display:'grid',
                gridTemplateColumns: `repeat(${lenArrOfSelectedDays < 6 ? lenArrOfSelectedDays : 5}, 1fr)`}}
                >
                {      
                    [...Array(arrOfSelectedDays.length).keys()].map((day) => (
                        <div className={`grid-day`}>                        
                        {
                            [...Array(halfHours).keys()].map((half) => (
                                <div key={day*100+half} 
                                 style={{backgroundColor: isHover[day*100+half] ? 'lightgreen' : 'white'}} class="grid-halfHour"></div>
                            ))
                        }
                        </div>))
                }
            </div>
            <br />
            <br />
        </div>
    </div>
);
    
}

export default MeetingNumberView;