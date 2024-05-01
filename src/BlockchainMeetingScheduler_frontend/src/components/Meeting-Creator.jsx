import React from 'react';
import '../index.scss';
import Calendar from './calendar.jsx';

function MeetingCreator() {

  return (
<div>
        <header class="sticky navbar bg-light">
            <img class="logoBMS" src="/BMS_Logo_Green.png"/>
        </header>
        <div class="centered-container">
            <div class="container center">
                <h1 class="mt-10">CHOOSE A NAME FOR YOUR MEETING</h1>
                <br />
                <input type="text" class="form-control center" placeholder="Name of the Meeting..."/>
                <br  />
                <button type="button" class="btn btn-lg btn-success">NEXT!</button>
            </div>
        </div>
        <div class="centered-container">
            <div class="container center">
                <h1 class="mt-10">CHOOSE A DATE FOR YOUR MEETING</h1>
                <br />
                <Calendar />
                <br  />
                <div class="div-for-buttons">
                    <button type="button" class="button-prev btn btn-lg btn-light border border-1">PREVIOUS!</button>
                    <button type="button" class="button-next btn btn-lg btn-success">NEXT!</button>
                </div>
            </div>
        </div>
        <div class="centered-container">
            <div class="container center">
                <h1 class="mt-10">INSERT ADDITIONAL INFORMATION ABOUT MEETING</h1>
                <br />
                <h2>Description</h2>
                <br />
                <input type="text" class="form-control center" placeholder="Description of the Meeting..."/>
                <br />
                <h2>Choose hours for the Meeting</h2>
                <br />
                <div class="range-container">
                <h2>Meeting Hours Selector</h2>
                    <div class="sliders-control">
                        <input type="range"  min="0" max="24" value="10" id="fromSlider"/>
                        <input type="range" min="0" max="24" value="18" id="customRange2"/>
                    </div>
                </div>
                <div class="div-for-buttons">
                    <button type="button" class="button-prev btn btn-lg btn-light border border-1">PREVIOUS!</button>
                    <button type="button" class="button-next btn btn-lg btn-success">NEXT!</button>
                </div>
            </div>
        </div>
    </div>

  );
}

export default MeetingCreator;