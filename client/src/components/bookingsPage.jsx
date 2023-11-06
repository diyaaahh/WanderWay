import{Link} from 'react-router-dom'
import{BsFillPersonFill} from "react-icons/bs";
import {AiOutlineUnorderedList} from "react-icons/ai"
import {BsBuildings} from "react-icons/bs"
import { useState, useEffect } from 'react';
import axios from 'axios';
import PlaceImg from './placeImg';
import { format } from 'date-fns/esm';
import { differenceInCalendarDays } from 'date-fns';

export default function BookingsPage(){

    const[bookings, setBookings] = useState([])
    useEffect(() =>{
        axios.get('/bookings'). then(response =>{
            setBookings(response.data)
        })
    }, [])

    return(
        <div>
             <nav className='navbar'>
            <div className='divforlink'>
            <Link className='myprofile' to ={'/account'}>
                <BsFillPersonFill style={{fontSize: '1.25rem'}}/>
                My profile</Link>
            </div>
            <div className='divforlink'>
            <Link className ="mybookings"to={'/account/bookings'}>
                <AiOutlineUnorderedList style={{fontSize: '1.25rem'}}/>
                My bookings</Link>
            </div>
            <div>
            <Link className='myplaces' to ={'/account/places'}> 
            <BsBuildings style={{fontSize: '1.25rem'}}/>
            My accomodations</Link>
            </div>
            </nav>
            <div >
                {bookings?.length > 0 && bookings.map((booking, index) =>(
                    <div key ={index} className=" m-10 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden border border-red-600">
                        <div className=" w-48">
                        <PlaceImg place={booking.place}/>
                        </div>
                        <div className='grow'>
                        <h2 className = "text-2xl"> {booking.place.title}</h2>
                        <div className='mt-4'>
                        {format(new Date( booking.checkIn), 'yyyy-MM-dd')} - {format(new Date( booking.checkOut), 'yyyy-MM-dd')}
                        </div>
                        <div > 
                            Number of nights: {differenceInCalendarDays(new Date (booking.checkIn),new Date (booking.checkOut))}
                            <br/>
                           Total price: Rs {booking.price}
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}