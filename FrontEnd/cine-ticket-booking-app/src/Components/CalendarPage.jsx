import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import styles from"./Style/CalendarPage.css"
import { ViewState } from '@devexpress/dx-react-scheduler';
import { useLocation } from 'react-router-dom';
import { ShowTime } from './Models/ShowTime';
import { useNavigate } from 'react-router-dom';
import showtimeService from '../services/showtime.service';
 
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
 
 
const currentDate = formatDate(new Date().toDateString());
 
 
const CalendarPage = () => {
  
  const location=useLocation();
  const movie = location.state;
  const [isLoading, setisLoading] = useState(true);
  const navigate=useNavigate();
  var ShowtimeList=[];
  const [schedulerData,setSchedulerData] =useState([]);

  const loadShowtimes=()=>{
    showtimeService.getShowtimesbyId(movie.id)
    .then(function (response) {
      ShowtimeList=[response]
  })
  .catch(function (error) {
      console.log("Error getting all movies: ",error);
  }).finally(() => {
    if(schedulerData.length<1){
      for (let i = 0; i < ShowtimeList.length; i++){
        let name="Night Show"
        if (i%2==0){
          name="Afternoon Show"
        }
        console.log(ShowtimeList[i].endTime)
        console.log(ShowtimeList[i].startTime)
        schedulerData.push({id:ShowtimeList[i].id,startDate:ShowtimeList[i].startTime,endDate:ShowtimeList[i].endTime,title:name})
    }
  }
    setisLoading(false)    
});
  };

  useEffect(() => {
    
    loadShowtimes();
  },[isLoading]);

  const newAppointment= (props) =>{
 
    return(
    <Appointments.Appointment {...props} onClick={()=>{
      if(props.data.id==2){
        var occupied=[];
        for(let i=0;i<ShowtimeList[0].seats.length;i++){
          if(ShowtimeList[0].seats[i]!="AVAILABLE"){
            occupied.push(i)
          }
        }
        console.log(ShowtimeList[0].room)
        navigate('/booking', {state:new ShowTime(ShowtimeList[0].id,ShowtimeList[0].startTime,ShowtimeList[0].endTime,movie.moviename,occupied,ShowtimeList[0].room.capacity)})
      }
      else
      {navigate('/booking', {state:ShowtimeList[props.data.id]})} }} />)
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