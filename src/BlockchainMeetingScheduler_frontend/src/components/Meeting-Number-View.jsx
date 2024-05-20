import React, {useState, useEffect} from 'react';
import './styles/meeting-number.scss';
import '../index.scss';

const MeetingNumberView = ({ match }) => {
    //getting uuid (unique ID)
    const uuid = match.params.uuid;
    console.log(uuid);
    //end
    //collecting all data from backend using uuid


    //end
    //hoovering check
    const [isHover, setIsHover] = useState([]);
    //end
    const [view, setView] = useState(false);
    //data of grid
    const [tableOfHours, setTableOfHours] = useState([[]]);
    //end
    //colors
    const [brighterShades,setBrighterShades] = useState([]);
    //end
    //data about users collected from backend
    const usersData = [
        {'user' : 'F3NDYs', 'availability' : [[2,3,4,5,6,7,13,14,15,16],[5,6,7,8,9,10,11],[11,12,13,14,15,16]]},
        {'user' : 'SCHWARZ', 'availability' : [[7,2,3,14,15,16],[5,6,7,11],[11,15,16]]},
        {'user' : 'BRUNO', 'availability' : [[7,14,15,16,17,18],[7,8,9,10,11,12,13,14],[7,8,9,10,11,12,13]]}
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
    //default function calls:
    useEffect(() => {
        async function fetchData() {
            await colors();
            await dataRework();
        }

        fetchData();
        wait(0).then(() => {
            setView(true);
        });

    }, []);

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    //end
    //data insert from backend to the table: (data rework)
    const dataRework = () => {
        const numRows = lenArrOfSelectedDays;
        const numCols = halfHours;
        const defaultValue = 0;
        const newTableOfHours = [];
        
        for (let i = 0; i < numRows; i++) {
          const newRow = [];

          for (let j = 0; j < numCols; j++) {
            if (i < tableOfHours.length && j < tableOfHours[i].length) {
              newRow.push(defaultValue);
            } else {
              newRow.push(defaultValue);
            }
          }
          
          newTableOfHours.push(newRow);
        }
        setTableOfHours(newTableOfHours);
        usersData.forEach((user) => {
            const availabilityOfUser = user.availability;
            availabilityOfUser.forEach((availability, j) => {
                availability.forEach((hour) => {
                    // Update the corresponding value in the newTableOfHours
                    newTableOfHours[j][hour]++;
                });
            });
        });
        setTableOfHours(newTableOfHours);
    };
    //end
    //generating brither colors
    // Function to generate a brighter shade of a given color
    const generateBrighterShade = (color, factor) => {
        const [, r, g, b] = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        let red = parseInt(r, 16);
        let green = parseInt(g, 16);
        let blue = parseInt(b, 16);
        
        red = Math.min(255, red + factor);
        green = Math.min(255, green + factor);
        blue = Math.min(255, blue + factor);
        
        return `#${(red << 16 | green << 8 | blue).toString(16).padStart(6, '0')}`;
    };
    
    const colors = () => {
        console.log(usersData);
        const originalGreen = '#5cb85c';
        const newBrighterShades = Array.from({ length: usersData.length }, (_, index) => generateBrighterShade(originalGreen, index * 25));
        newBrighterShades.reverse();
        newBrighterShades.unshift('#FFFFFF');
        setBrighterShades(newBrighterShades);
    };
    //end
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
        { view ? (
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
                                    style={{backgroundColor: brighterShades[tableOfHours[day][half]]}} 
                                    class="grid-halfHour">
                                    </div>
                                ))
                            }
                            </div>))
                    }
                </div>
                <br />
                <br />
            </div>
        </div> ) : (<p></p>)}
    </div>
);
    
}

export default MeetingNumberView;