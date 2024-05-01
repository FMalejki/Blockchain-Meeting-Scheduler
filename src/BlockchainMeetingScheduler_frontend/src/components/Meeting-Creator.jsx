import React, {useState} from 'react';
import '../index.scss';
import Calendar from './calendar.jsx';

function MeetingCreator() {
    
    const [numOfStep, setNumOfStep] = useState(0);
    const [meetingName, setMeetingName] = useState('');
    const [alertFirst, setAlertFirst] = useState(false);

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

    const handleMeetingNameChange = (event) => {
        setMeetingName(event.target.value)
    };

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
                <button type="button" onClick={firstStep} className="btn btn-lg btn-success">NEXT!</button>
                {alertFirst && (
                <div class="alert alert-danger">
                    Please fill in the field.
                </div> )}
            </div>
        </div>
        <div className={`centered-container ${numOfStep === 1 ? 'activeOnMeetingCreator' : 'inactive'}`}>
            <div className="container center">
                <h1 className="mt-10">CHOOSE A DATE FOR YOUR MEETING</h1>
                <br />
                <Calendar />
                <br  />
                <div className="div-for-buttons">
                    <button type="button" onClick={secondStepButtonPrev} className={`button-prev btn btn-lg btn-light border border-1`}>PREVIOUS!</button>
                    <button type="button" className="button-next btn btn-lg btn-success">NEXT!</button>
                </div>
            </div>
        </div>
        <div className={`centered-container ${numOfStep === 2 ? 'activeOnMeetingCreator' : 'inactive'}`}>
            <div className="container center">
                <h1 className="mt-10">INSERT ADDITIONAL INFORMATION ABOUT MEETING</h1>
                <br />
                <h2>Description</h2>
                <br />
                <input type="text" className="form-control center" placeholder="Description of the Meeting..."/>
                <br />
                <h2>Choose hours for the Meeting</h2>
                <br />
                <div className="range-container">
                <h2>Meeting Hours Selector</h2>
                    <div className="sliders-control">
                        <input type="range"  min="0" max="24" value="10" id="fromSlider"/>
                        <input type="range" min="0" max="24" value="18" id="customRange2"/>
                    </div>
                </div>
                <div className="div-for-buttons">
                    <button type="button" className="button-prev btn btn-lg btn-light border border-1">PREVIOUS!</button>
                    <button type="button" className="button-next btn btn-lg btn-success">NEXT!</button>
                </div>
            </div>
        </div>
    </div>

  );
}

export default MeetingCreator;