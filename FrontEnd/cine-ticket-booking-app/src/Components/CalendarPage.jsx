import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import styles from"./Style/CalendarPage.css"
import { ViewState } from '@devexpress/dx-react-scheduler';
import { useLocation } from 'react-router-dom';
import { ShowTime } from './Models/ShowTime';
import { useNavigate } from 'react-router-dom';
 
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
 
 
const CalendarPage = () => {
  const location=useLocation();
  const movie = location.state;
  const [isLoading, setLoading] = useState(true);
  const navigate=useNavigate();
  const ShowtimeList=[new ShowTime(0,'2024-03-03T17:30','2024-03-03T19:30',movie.moviename,[9, 41, 35, 11, 65, 26]),
  new ShowTime(1,'2024-03-03T20:00','2024-03-03T22:30',movie.moviename,[9, 41, 35, 11, 65, 26])];
  const [schedulerData,setSchedulerData] =useState([]);
  var inserts=0;
  useEffect(() => {
    const data=[]
    inserts=inserts+1;
    for (let i = 0; i < ShowTime.length; i++){
      if(schedulerData.length<2){
       let name="Night Show"
       if (i%2==0){
        name="Afternoon Show"
       }
       schedulerData.push({id:ShowtimeList[i].id,startDate:ShowtimeList[i].startDate,endDate:ShowtimeList[i].endDate,title:name})
       console.log(schedulerData[i]);
      }
 
    }
    setLoading(false)
    
  });
  const newAppointment= (props) =>{
    console.log(props.data.id)
 
    return(
    <Appointments.Appointment {...props} onClick={()=>{
      // navigate('/booking',{state:new ShowTime("25/02/2024, 15:25", "25/02/2024, 18:05", movie.moviename, [9, 41, 35, 11, 65, 26])})
      navigate('/booking', {state:ShowtimeList[props.data.id]}) }} />)
  };
 
  const DayScaleCell = props => (
    <WeekView.DayScaleCell
      {...props}
      onClick={() => console.log("Hi")}
    />
  );
const [date, setDate] = useState(new Date());
 
 
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  else{
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
    <WeekView startDayHour={17} endDayHour={24} dayScaleCellComponent={DayScaleCell} />
    <DateNavigator />
    <TodayButton />
    <Appointments appointmentComponent={newAppointment}/>
    </Scheduler>
  </Paper>
    </div>
    </div>
  )};
};
 
export default CalendarPage;