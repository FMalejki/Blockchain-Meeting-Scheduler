import React, {useState} from 'react';
import { BlockchainMeetingScheduler_backend } from '../declarations/BlockchainMeetingScheduler_backend/index';
import '../index.scss';
import Calendar from './calendar.jsx';

function MeetingCreator() {
    
    //variables:
    const [numOfStep, setNumOfStep] = useState(0);
    const [meetingName, setMeetingName] = useState('');
    const [alertFirst, setAlertFirst] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);
    const [alertSecond, setAlertSecond] = useState(false);
    const [startHour, setStartHour] = useState(10);
    const [endHour, setEndHour] = useState(18);
    const [meetingDescription, setMeetingDescription] = useState('');
    const [dayArray, setDayArray] = useState([]);
    const [monthArray, setMonthArray] = useState([]);
    const [yearArray, setYearArray] = useState([]);
    //end


    //creating a unique uuid for created meeting

    async function createUniqueID(name) {
        const uuid = await BlockchainMeetingScheduler_backend.unique_ID(name);
        console.log(uuid);
    }

    //end

    //steps / buttons

    const firstStep = () => {
      if(meetingName.trim() === ''){
        setAlertFirst(true);
      }
      else{
        setNumOfStep(1);
        setAlertFirst(false);
        }
    };
    const secondStepButtonPrev = () => {
        setNumOfStep(0)
    }; 

    const secondStepButtonNext = () => {
        console.log(selectedDates)
        if(selectedDates.length === 0){
            setAlertSecond(true);
        }
        else{
            setNumOfStep(2);
            setAlertSecond(false);
        }
    };

    const thirdStepButtonPrev = () => {
        setNumOfStep(1);
    };

    const thirdStepButtonFinish = () => {
        dataRework();
        console.log("finished");
        console.log("startHour: ",startHour, "endHour: ", endHour, "selectedDates: ", selectedDates);
        console.log("meetingName: ", meetingName, "meetingDescription: ", meetingDescription);
        console.log("days selected: ", dayArray, "months selected: ", monthArray, "years selected: ", yearArray);
    };

    //end

    //handling changes

    const handleMeetingNameChange = (event) => {
        setMeetingName(event.target.value)
    };
 
    const handleDatesSelected = (dates) => {
        setSelectedDates(dates);
    };

    const handleMeetingDescriptionChange = (event) => {
        setMeetingDescription(event.target.value);
    };
    
    const handleStartHourChange = (event) => {
        if( parseInt(event.target.value) < endHour){    
            setStartHour(parseInt(event.target.value));
        }
    };
    
    const handleEndHourChange = (event) => {
        if( parseInt(event.target.value) > startHour ){    
            setEndHour(parseInt(event.target.value));
        }
    };

    //end
    //rework of data in selectedDates:
    async function dataRework() {
        let arrTmp = selectedDates;
        for(let i = 0;  i < arrTmp.length; i++ ){
            await setDayArray(prevDays => [...prevDays, arrTmp[i].day]);
            await setMonthArray(prevMonths => [...prevMonths, arrTmp[i].month]);
            await setYearArray(prevYears => [...prevYears, arrTmp[i].year]);
        }
        
        //in here we also need to make sure that user doesnt click this button more than once
        //we can always cut the array to take only the length of selectedDates array or
        //just make the whole page disappear after FINISH button is clicked - global variable

        await setSelectedDates([]); //why it isnt taking [] value ?
    };
    //end   

  return (
<div>
        <header className="sticky navbar bg-light">
            <img className="logoBMS" src="/BMS_Logo_Green.png"/>
        </header>
        <div className={`centered-container ${numOfStep === 0 ? 'activeOnMeetingCreator' : 'inactive'}`}>
            <div className={`container center`}>
                <h1 className="mt-10">CHOOSE A NAME FOR YOUR MEETING</h1>
                <br />
                <input type="text" value={meetingName} onChange={handleMeetingNameChange} className="form-control center" placeholder="Name of the Meeting..."/>
                <br  />
                {alertFirst && (
                <p class="font-size-alert">
                    Please fill in the field.
                </p> )}
                <button type="button" onClick={firstStep} className="btn btn-lg btn-success">NEXT!</button>
            </div>
        </div>
        <div className={`centered-container ${numOfStep === 1 ? 'activeOnMeetingCreator' : 'inactive'}`}>
            <div className="container center">
                <h1 className="mt-10">CHOOSE A DATE FOR YOUR MEETING</h1>
                <br />
                <Calendar onDatesSelected={handleDatesSelected}/>
                <br />
                {alertSecond && (
                    <p class="font-size-alert">
                        Please choose at least one date.
                    </p>
                )}
                <div className="div-for-buttons">
                    <button type="button" onClick={secondStepButtonPrev} className={`button-prev btn btn-lg btn-light border border-1`}>PREVIOUS!</button>
                    <button type="button" onClick={secondStepButtonNext} className="button-next btn btn-lg btn-success">NEXT!</button>
                </div>
            </div>
        </div>
        <div className={`centered-container ${numOfStep === 2 ? 'activeOnMeetingCreator' : 'inactive'}`}>
            <div className="container center">
                <h1 className="mt-10">ADDITIONAL INFORMATION ABOUT MEETING</h1>
                <br />
                <h2>Description</h2>
                <br />
                <input type="text" value={meetingDescription} onChange={handleMeetingDescriptionChange} className="form-control center" placeholder="Description of the Meeting..."/>
                <br />
                <h2>Choose hours for the Meeting</h2>
                <br />
                <div className="range-container">
                    <h2 class="marginBottom5">Meeting Hours Selector</h2>
                    <div className="sliders-control">
                        <input
                        type="range"
                        min="0"
                        max="24"
                        value={startHour}
                        onChange={handleStartHourChange}
                        className="hour-slider"
                        />
                        <input
                        type="range"
                        min="0"
                        max="24"
                        value={endHour}
                        onChange={handleEndHourChange}
                        className="hour-slider"
                        />
                    </div>
                </div>
                <div class="marginTop5">
                    <h2>Hours selected:</h2>
                    <p>{startHour}:00 - {endHour}:00</p>
                </div>
                <div className="marginTop5 div-for-buttons">
                    <button onClick={thirdStepButtonPrev} type="button" className="button-prev btn btn-lg btn-light border border-1">PREVIOUS!</button>
                    <button onClick={thirdStepButtonFinish} type="button" className="button-next btn btn-lg btn-success">NEXT!</button>
                </div>
            </div>
        </div>
    </div>

  );
}

export default MeetingCreator;