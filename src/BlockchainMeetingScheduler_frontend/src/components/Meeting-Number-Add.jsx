import React, {useState, useEffect} from 'react';
import './styles/meeting-number.scss'

function MeetingNumberAdd() {
    //hoovering check
    const [isHover, setIsHover] = useState([]);
    //end
    //check if mouse is down or not
    const [isMouseDown, setIsMouseDown] = useState(false);
    //end
    //array with data of one user
    const [matrix, setMatrix] = useState([[]]);
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

    const addRow = () => {
        setMatrix(prevMatrix => [...prevMatrix, []]);
    };


    const addElementToRow = (indexToAdd, element) => {
        setMatrix(prevMatrix => {
            const updatedMatrix = [...prevMatrix];
            if (!updatedMatrix[indexToAdd]) {
                updatedMatrix[indexToAdd] = [];
            }
            updatedMatrix[indexToAdd].push(element);
            return updatedMatrix;
        });
    };

    const submitAvailability = () => {
        if(!isSubmitting){
            setIsSubmitting(true);
            const datesChecked = isHover.map((value,index) => {
                if(value === true) {
                    return index;
                }
            }).filter(index => index !== undefined);
            //we need to create a table thats the same length as arrOfSelectedDays
            //then for each of those days (in array) add halfhours that the user checked
            //at this moment we have a created and functioning array of selected hours for every day
            //now we just need to pass this table to backend and using data collected from frontend
            //create a presentation of all data in the same form like on lettucemeet
            console.log(datesChecked);
            for( let i = 0; i < arrOfSelectedDays.length-1; i++){
                addRow();
            }
            for( let i = 0; i < datesChecked.length; i++){
                for( let j = 0; j < arrOfSelectedDays.length; j++){
                    if(datesChecked[i] < (j+1)*100){
                        
                        setMatrix(prevMatrix => {
                            const updatedMatrix = [...prevMatrix];
                            updatedMatrix[j].push(datesChecked[i]-(j)*100);
                            return updatedMatrix;
                        });
                        break;
                    }
                }
            }
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        removeDuplicatesFromMatrix();
    }, [matrix]);


    const removeDuplicatesFromMatrix = () => {
        for( let i = 0; i < matrix.length; i++){
            if(matrix[i]){
                for( let j = 0; j < matrix[i].length; j++){
                    const searchedNum = matrix[i][j];
                    for( let k = j + 1; k < matrix[i].length; k++){
                        if(searchedNum === matrix[i][k]){
                            matrix[i].splice(k,matrix[i].length - k);
                        }
                    }
                }
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

    const handleMouseDown = (index) => {
        setIsMouseDown(true);
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
    
    const handleMouseUp = () => {
        setIsMouseDown(false);
        console.log("changed");
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
    <div  onMouseUp={handleMouseUp}>
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
                            //handle mouseDown - like something in a shape of an global variable
                            //a function that checks if a downed mouse is over point that interests us
                            //so when a mouse is downed on a certain object it should be filled with green
                            //then a global variable should  be changed -> a mouse is downed
                            //when a mouse is over an object we should check if its downed if so this date should be painted green
                            //if not this area should change border and shadow also next to the mouse should appear a box with all users
                            //that are available on this particular halfHour 
                            [...Array(halfHours).keys()].map((half) => (
                                <div key={day*100+half} 
                                //50*(24+24) 48 < 50 - so there will never be any conflict
                                //it is temporary because we want to know which days are selected so there needs to 
                                //be used a code (?)
                                 onMouseEnter={() => mouseOverObject(day*100+half)}
                                 //onMouseLeave={() => mouseOverObject(day*50+half)}
                                 onMouseDown={() => handleMouseDown(day*100+half)}
                                 style={{backgroundColor: isHover[day*100+half] ? 'lightgreen' : 'white'}} class="grid-halfHour"></div>
                            ))
                        }
                        </div>))
                }
            </div>
            <br />
            <button type="button" onClick={submitAvailability} className="button-next btn btn-lg btn-success">VIEW OTHERS AVAILABILITY!</button>
            <br />
        </div>
    </div>
);
    
}

export default MeetingNumberAdd;