import React, { useState } from 'react';
import './styles/calendar.scss';


function Calendar(){
    const [ifActive, setIfActive] = useState(false);

    const eee = () => {
        console.log("eeeClicked");
        setIfActive(!ifActive);
    };

    const [selectedDate, setSelectedDate] = useState(null);

    // Function to get the number of days in a month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Function to get the starting day of the month
    const getStartingDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay(); // Sunday is 0, Monday is 1, etc.
    };

    // Function to handle date click event
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    // Example: Display dates for January 2024
    const year = 2024;
    const month = 2; // January (0-indexed)
    const daysInMonth = getDaysInMonth(year, month);
    const startingDay = getStartingDayOfMonth(year, month);
    console.log(startingDay)

    return(
        <div className="containerCal">
            <div className="calendarDiv">
                <div className="calendarTop">
                    <div className="arrowLYear">+</div>
                    <div className="calendarYear">
                        2024
                    </div>
                    <div className="arrowRYear">+</div>
                </div>
                <div className="calendarMonths">
                    <div className="arrowLMonth">-</div>
                    <div className="Months">January</div>
                    <div className="arrowRMonth">+</div>
                </div>
                <div className="weekDays">
                    <div className="day">Mon</div>
                    <div className="day">Tue</div>
                    <div className="day">Wed</div>
                    <div className="day">Thu</div>
                    <div className="day">Fri</div>
                    <div className="day">Sat</div>
                    <div className="day">Sun</div>
                </div>
                <div className="allDays">
                    {[...Array(startingDay-1).keys()].map((day) => (
                        <div className={`dayToChoose}`}>.</div>
                    ))}
                    {[...Array(daysInMonth).keys()].map((day) => (
                        <div
                            key={day + 1}
                            className={`dayToChoose ${selectedDate === day + 1 ? 'selected' : ''}`}
                            style={{ background: ifActive ? '#ADD8E6' : '#fff' }}
                            onClick={() => handleDateClick(day + 1)}
                        >
                            {day + 1}
                        </div>
                    ))}
                </div>
                <div className="calendarDays">

                </div>
            </div>
        </div>
    );
}

export default Calendar;
