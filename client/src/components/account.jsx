import{useContext, useState} from 'react'
import { UserContext } from '../userContext';
import {Link, Navigate, useParams} from 'react-router-dom'
import "./account.css"
import axios from 'axios'
import{BsFillPersonFill} from "react-icons/bs";
import {AiOutlineUnorderedList} from "react-icons/ai"
import {BsBuildings} from "react-icons/bs"
import PlacesPage from './places';
import BookingsPage from './bookingsPage';

function AccountPage(){

const{user, setUser} = useContext(UserContext);

const {subpage} = useParams();
const[redirect , setRedirect] = useState(null)

let content;
if(subpage == 'bookings'){
    content =(
        <BookingsPage/>
    )
}
else if(subpage == 'places'){
    content=(
        <PlacesPage/>
    )
}
else {
    content = (
        // Default content when the subpage is not recognized or user is not available
        <div className='after-clickprofile'>
            {user ? (
                <>
                    You are logged in as {user.name} ({user.email})<br/>
                    <button className='logoutbutton' onClick={logout}> Logout</button>
                </>
            ) : (
                <>You are not logged in. Please log in and continue</>
            )}
        </div>
    );
}

async function logout(){
   await axios.post('/logout');
   setRedirect('/');
   setUser(null);
}

if(redirect){
    return <Navigate to={redirect}/>
}

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
            {content}
        </div>
    )
}

export default AccountPage;