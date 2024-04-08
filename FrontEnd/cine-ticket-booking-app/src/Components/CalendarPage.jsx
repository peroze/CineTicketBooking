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
 
 


const CalendarPage = () => {
  
  const location=useLocation();
  const movie = location.state;
  const [isLoading, setisLoading] = useState(true);
  const navigate=useNavigate();
  var ShowtimeList=[];
  const [schedulerData,setSchedulerData] =useState([]);
  const [currentDate,currentDateChange] = useState(formatDate(new Date().toDateString()));

  const loadShowtimes=()=>{
   // showtimeService.getShowtimesbyId(movie.id)
    showtimeService.getShowtimesbyMovieId(movie.id)
    .then(function (response) {
      ShowtimeList=response
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
        schedulerData.push({id:ShowtimeList[i].id,startDate:ShowtimeList[i].startTime,endDate:ShowtimeList[i].endTime,title:name})
    }
  }
    setisLoading(false)    
});
  };

  useEffect(() => {
    /*showtimeService.getShowtimesbyMovieId(movie.id)
    .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log("Error getting all movies: ",error);
  })*/
    loadShowtimes();
  },[isLoading]);

  const newAppointment= (props) =>{
 
    return(
    <Appointments.Appointment {...props} onClick={()=>{
        
      var ind=ShowtimeList.findIndex((sh) => sh.id==props.data.id)
      //console.log(ind);
        var occupied=[];
        for(let i=0;i<ShowtimeList[0].seats.length;i++){
          if(ShowtimeList[ind].seats[i]!="AVAILABLE"){
            console.log("OCUPPIED  " +i)
            occupied.push(i)
          }
        }
        navigate('/booking', {state:new ShowTime(ShowtimeList[ind].id,ShowtimeList[ind].startTime,ShowtimeList[ind].endTime,movie.moviename,occupied,ShowtimeList[ind].room.capacity)})
    }} />)
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
        onCurrentDateChange={currentDateChange}
      />
     <Toolbar />
    <WeekView startDayHour={17} startDayMinute={30} endDayHour={24} dayScaleCellComponent={DayScaleCell} />
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