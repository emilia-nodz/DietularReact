import React, { useState } from 'react';
import styles from './Calendar.module.css';
import DayDetail from './DayDetails';

interface SelectedDay{
    year: number;
    month: number;
    day: number;
}

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<SelectedDay | null>(null);

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const changeMonth = (offset: number) => {
        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1);
            return newDate;
        });
    };

    const selectDay = (day: number) => {
        const newDay: SelectedDay = {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            day: day,
        };

        if (
            selectedDay &&
            selectedDay.year === newDay.year &&
            selectedDay.month === newDay.month &&
            selectedDay.day === newDay.day) {
            setSelectedDay(null);
        } else {
            setSelectedDay(newDay);
        }
    };
    

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);


    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyCells = Array.from({ length: firstDayOfMonth }, () => null);

    return (
        <div className={styles.calendar}>
            <div className={styles.header}>
                <button onClick={() => changeMonth(-1)}>&lt;</button>
                <h2>
                    {new Intl.DateTimeFormat('pl-Pl', { month: 'long', year: 'numeric' })
                        .format(currentDate)
                        .replace(/^./, (str) => str.toUpperCase())}
                </h2>
                <button onClick={() => changeMonth(1)}>&gt;</button>
            </div>
            <div className={styles.weekdays}>
                {['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'].map((day) => (
                    <div key={day} className={styles.weekday}>{day}</div>
                ))}
            </div>
            <div className={styles.days}>
                {emptyCells.map((_, index) => <div key={`empty-${index}`} className={styles.empty}></div>)}
                {daysArray.map((day) => {
                    const isSelected = 
                        selectedDay &&
                        selectedDay.year === year &&
                        selectedDay.month === month &&
                        selectedDay.day === day;
                    return(
                    <div 
                        key={day}
                        className={`${styles.day} ${isSelected ? styles.selectedDay : ''}`}
                        onClick={() => selectDay(day)}
                    >{day}</div>
                    );
                })}
            </div>
            {selectedDay !== null && (
                <div className="day-container">
                    <DayDetail day={{ 
                        id: new Date(selectedDay.year, selectedDay.month, selectedDay.day).getTime(),
                        date: `${selectedDay.year}-${String(selectedDay.month + 1).padStart(2, '0')}-${String(selectedDay.day).padStart(2, '0')}`,
                        item_details: null,
                        meal_details: null
                    }} />
                </div>
            )}

        </div>
    );
};

export default Calendar;