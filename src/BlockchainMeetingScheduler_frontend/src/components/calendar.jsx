import React, { useState, useEffect } from 'react';
import './styles/calendar.scss';


const Calendar = ({ onDatesSelected }) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const [ifActive, setIfActive] = useState(false);
    const [month, changeMonth] = useState(currentMonth);
    const [day, changeDay] = useState(currentDay);
    const [year, changeYear] = useState(currentYear);


    const [selectedDates, setSelectedDates] = useState([]);

    const whichMonth = (month) => {
        const namesOfMonths = ['January','February','March','April','May','June','July','August','September','October','November','December']; 
        return namesOfMonths[month];
    };

    const decreaseYear = () => {
        if(year > 0){
            changeYear(year-1);
        }
    };

    const increaseYear = () => {
        changeYear(year+1);
    };

    const increaseMonth = () => {
        if(month === 11){
            changeMonth(0);
            increaseYear();
        }
        else{
            changeMonth(month+1);
        }
    };

    const descreaseMonth = () => {
        if(month === 0){
            changeMonth(11);
            decreaseYear();
        }
        else{
            changeMonth(month-1);
        }
    };

    const dateSelection = (dayTmp) => {
        const selectedDate = {year, 'month': month+1, 'day': dayTmp};
        const isDateAlreadySelected = selectedDates.some(date =>
            date.year === selectedDate.year &&
            date.month === selectedDate.month &&
            date.day === selectedDate.day
        );
        if (isDateAlreadySelected){
            setSelectedDates(prevSelectedDates => prevSelectedDates.filter(date =>
                 date.month !== selectedDate.month ||
                 date.year !== selectedDate.year ||
                 date.day !== selectedDate.day
            ));
        }else{
            setSelectedDates(prevSelectedDates => [...prevSelectedDates, selectedDate]);
        }
    };
    
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getStartingDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(year, month);
    let startingDay = getStartingDayOfMonth(year, month);
    if(startingDay === 0) {
        startingDay = 7;
    }
    useEffect(() => {
        // Pass selectedDates array to the parent component whenever it changes
        onDatesSelected(selectedDates);
    }, [selectedDates, onDatesSelected]);

    return(
        <div className="containerCal">
            <div className="calendarDiv">
                <div className="calendarTop">
                    <div onClick={decreaseYear} className="arrow arrow-left yeararrow-left"></div>
                    <div className="calendarYear">
                        {year}
                    </div>
                    <div onClick={increaseYear} className="arrow arrow-right yeararrow-right"></div>
                </div>
                <div className="calendarMonths">
                    <div onClick={descreaseMonth} className="arrow arrow-left montharrow-left"></div>
                    <div className="Months">{whichMonth(month)}</div>
                    <div onClick={increaseMonth} className="arrow arrow-right montharrow-right"></div>
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
                    {
                    [...Array(startingDay-1).keys()].map((day) => (
                        <div className={`dayToChoose}`}>.</div>
                    ))}
                    {[...Array(daysInMonth).keys()].map((day) => (
                        <div
                            key={day + 1}
                            className={`dayToChoose ${selectedDates.some(date =>
                                date.year === year &&
                                date.month === month + 1 &&
                                date.day === day + 1   
                            ) ? 'bg-success text-white' : ''}`}
                            style={{ background: ifActive ? '#ADD8E6' : '#fff' }}
                            onClick={() => dateSelection(day + 1)}
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
