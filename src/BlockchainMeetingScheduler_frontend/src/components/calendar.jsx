import React, { useState } from 'react';
import './styles/calendar.scss';


function Calendar(){
    return(
        <div class="containerCal">
            <div class="calendarDiv">
                <div class="calendarTop">
                    <div class="arrowLYear">+</div>
                    <div class="calendarYear">
                        2024
                    </div>
                    <div class="arrowRYear">+</div>
                </div>
                <div class="calendarMonths">
                    <div class="arrowLMonth">-</div>
                    <div class="Months">January</div>
                    <div class="arrowRMonth">+</div>
                </div>
                <div class="weekDays">
                    <div class="day">Mon</div>
                    <div class="day">Tue</div>
                    <div class="day">Wed</div>
                    <div class="day">Thu</div>
                    <div class="day">Fri</div>
                    <div class="day">Sat</div>
                    <div class="day">Sun</div>
                </div>
                <div class="allDays">
                    <div class="dayToChoose">1</div>
                    <div class="dayToChoose">2</div>
                    <div class="dayToChoose">3</div>
                    <div class="dayToChoose">4</div>
                </div>
                <div class="calendarDays">

                </div>
            </div>
        </div>
    );
}

export default Calendar;
