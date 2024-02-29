import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import styles from"./Style/CalendarPage.css"
import { ViewState } from '@devexpress/dx-react-scheduler';
import { useLocation } from 'react-router-dom';

import {
  Scheduler,
  WeekView,
  Appointments,
  DateNavigator,
  Toolbar,
  TodayButton
} from '@devexpress/dx-react-scheduler-material-ui';

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

console.log(formatDate(new Date().toDateString()));
const currentDate = formatDate(new Date().toDateString());
const schedulerData = [
  { startDate: '2024-02-20T17:30', endDate: '2024-02-20T19:30', title: 'Play1' },
  { startDate: '2024-02-20T20:00', endDate: '2024-02-20T22:30', title: 'Play2' },
];
const CalendarPage = () => {
const [date, setDate] = useState(new Date());
const location=useLocation();
const movie = location.state;

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className='calendarcontainer'>
      <h1>Booking</h1>
      <div className='calendar'>
      <Paper>
    <Scheduler
      data={schedulerData}
    >
      <ViewState
        currentDate={currentDate}
      />
     <Toolbar />
    <WeekView startDayHour={17} endDayHour={24} />
    <DateNavigator />
    <TodayButton />
      <Appointments />
    </Scheduler>
  </Paper>
    </div>
    </div>
  );
};

export default CalendarPage;
