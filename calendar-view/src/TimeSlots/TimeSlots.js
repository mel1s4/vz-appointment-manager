import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import {_vz, Month, formatDate} from '../translations';
import './TimeSlots.scss';

export default function TimeSlots({
  timeSlots,
  selectedYear,
  selectedMonth,
  selectedDay,
  timeSlotSize,
  selectedTimeSlot,
  timeSlotsAreLoading,
  setSelectedTimeSlot,
  timeZone,
  visitorTimeZone,
  lockedTimeSlots,
}) {

  function selectedDateFormatted() {
    if (
      selectedDay >= 0 &&
      selectedMonth >= 0 &&
      selectedYear > 2000
    ) {
      return `${Month(selectedMonth)} ${selectedDay}, ${selectedYear}`;
    }
    return
  }

  function selectTimeSlot(e, timeObject) {
    e.preventDefault();
    const date = DateTime.fromISO(timeObject.date.replace(" ", "T"), { zone: timeObject.timezone });
    setSelectedTimeSlot(date.toJSDate());
  }


  function timeslotsAreReady() {
    return timeSlots && timeSlots[selectedYear] && timeSlots[selectedYear][selectedMonth + 1] && timeSlots[selectedYear][selectedMonth + 1][selectedDay];
  }

  function isSelectedTimeSlot(currentTimeSlot) {
    if (selectedTimeSlot) {
      const date = DateTime.fromISO(currentTimeSlot.date.replace(" ", "T"), { zone: currentTimeSlot.timezone });
      return date.toJSDate().getTime() === selectedTimeSlot.getTime();
    }
    return false;
  }

  function noTimeSlots() {
    return timeslotsAreReady() && timeSlots[selectedYear][selectedMonth + 1][selectedDay].length === 0;
  }

  function getCurrentTimeSlots() {
    if (timeslotsAreReady()) {
      
      if (!timeSlots ||
        !timeSlots[selectedYear]
        || !timeSlots[selectedYear][selectedMonth + 1]
        || !timeSlots[selectedYear][selectedMonth + 1][selectedDay]
        || timeSlots[selectedYear][selectedMonth + 1][selectedDay].length === 0
      ) return [];
      else 
        return timeSlots[selectedYear][selectedMonth + 1][selectedDay];
    }
    return [];
  }


  function formatSlotTimeObject(timeObject) {
    // timeObject.date, timeObject.timezone
    const timeDate = timeObject.date.replace(" ", "T");
    const date = DateTime.fromISO(timeDate, { zone: timeObject.timezone });
    // make date in visitor timezone
    const visitorDate = date.setZone(visitorTimeZone);
    return visitorDate.toLocaleString(DateTime.TIME_SIMPLE);
  }


  

  return (
    <div className="vz-time-slots">
    <h2 className="vz-am__title">{selectedDateFormatted()}</h2>
    <p>
      {timeSlotSize} {_vz('minutes-per-slot')}
    </p>
    { timeSlotsAreLoading[selectedYear + '-' + (selectedMonth + 1) + '-' + selectedDay] && (
        <ul className="vz-am__loading-timeslots">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      )
    }
    <ul className="vz-am__time-slots__list">
      { timeslotsAreReady() && getCurrentTimeSlots().map((
        time, index
      ) => (
        <li className="vz-am__time-slots__item" key={index}>
          <button
            onClick={(e) => selectTimeSlot(e, time)}
            className={`vz-am__time-slot__button ` + (isSelectedTimeSlot(time) ? '--selected' : '')}
          >
            {formatSlotTimeObject(time)}
          </button>
        </li>
      ))
      }
    </ul>

    { noTimeSlots() && (
        <p>
          {_vz('no-meetings')}
        </p>
    )}

    <p className="vz-am__visitor-timezone">
      <b> {_vz('your-timezone-is') } </b> {visitorTimeZone}
    </p>
    <p className="vz-am__website-timezone">
      <b> {_vz('website-timezone-is') } </b> {timeZone}
    </p>

  </div>
  )
}