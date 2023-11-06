import {useContext, useEffect, useState} from "react";
import'./places.css'
import axios from "axios";
import {Navigate} from "react-router-dom";
import {differenceInCalendarDays , format} from 'date-fns'

export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    const [name,setName] = useState('');
    const [phone,setPhone] = useState('');
    const [redirect , setRedirect] = useState('')

    let numberOfNights=0;
    if(checkIn && checkOut){
      numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

   async  function bookThisPlace(){
      const response =await axios.post('/bookings', 
      {checkIn, checkOut , numberOfGuests, name , phone , place:place._id, 
      price: numberOfNights * place.price})

      const bookingId = response.data._id
      setRedirect(`/`);
    }

    if (redirect) {
      return <Navigate to={redirect} />
    }

    return(
        <div className="bg-white shadow p-4 rounded-2xl w-100 ">
      <div className="text-2xl text-center">
        Price: Rs {place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input type="date"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input type="date" value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
        </div>
        {numberOfNights > 0 && (
          <div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input type="number"
                 value={numberOfGuests}
                 onChange={ev => setNumberOfGuests(ev.target.value)}/>
        </div>
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}/>
            <label>Phone number:</label>
            <input type="tel"
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}/>
          </div>
          </div>
        )}
      </div>
      <button  onClick={bookThisPlace}  className="bookthisplace">
        Book this place
        { numberOfNights > 0 &&(
        <span> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
    )
}