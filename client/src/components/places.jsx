import { Link, useParams } from "react-router-dom";
import "./places.css"
import {BsPlusCircle} from "react-icons/bs"
import {AiOutlineCloudUpload} from "react-icons/ai"
import { useState } from "react";
import Perks from "./perks";
import axios from 'axios'

export default function PlacesPage(){

    const[title,setTitle]=useState('')
    const[address, setAddress]=useState('')
    const[addedPhotos , setAddedPhotos] = useState([])
    const[photoLink , setphotoLink]=useState('')
    const[description, setDescription]=useState('')
    const[perks,setPerks]=useState('')
    const[checkIn, setCheckIn]= useState('')
    const[checkOut, setCheckOut]= useState('')
    const[maxGuests , setMaxGuests]= useState(1)

    function inputHeader(text){
        return(
            <h2 className=" mt-4 text-2xl"> {text} </h2>   
        )
    }
    async function addPhotoByLink(ev){
        ev.preventDefault();
       const {data:filename}= await axios.post('/upload-by-link' ,{link:photoLink});
       setAddedPhotos(prev =>{
        return[...prev , filename];
       })
       setphotoLink('')
    }
   const {action} = useParams();

    return(<div>
        {action !== 'new' &&(
 <div className="divforaddnewplaces">
        
 <Link className="addnewplaces" to ={'/account/pages/new'}> <BsPlusCircle style={{ fontSize: "1.3rem"}}/>   Add new places</Link>
 </div>
        )}
{action == 'new' && (
<div className="ml-5"> 
    <form> 
        {inputHeader('Title')}
        <input type ='text' 
        placeholder="name of the place"
         value = {title} 
         onChange={ev => setTitle(ev.target.value)} className="input"/>

        {inputHeader('Address')}
        <input type ='text'
        placeholder="the location"
        value={address}
         onChange={ev =>setAddress(ev.target.value)} className="input" />

        {inputHeader('Photo')}
        <div className=" flex gap-2"> 
           <input type ="text" 
           placeholder=" Add using a link ... jpg" value={photoLink} 
           onChange= {ev =>setphotoLink(ev.target.value)}
           className="input"/>

           <button className="addphoto-button" onClick={addPhotoByLink}> Add photo </button>
            </div>
        <div className=" grid gap-2 mt-6 grid grid-cols-3  md: grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 && addedPhotos.map((link,index) =>(
            <div key={index}>
                <img className = "rounded-2xl"  src={'http://localhost:4000/uploads/' +link} alt={link}/>
            </div>
        ))}
        <button className="border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex gap-2 items-center" > 
        <AiOutlineCloudUpload style={{fontSize:"2rem"}}/>
        Upload 
        </button>
        </div>
        {inputHeader('Description')}
        <textarea className="textarea"
         value={description} 
         onChange={ev =>setDescription(ev.target.value)}/>

        {inputHeader('Perks')}
        <p> Select all the perks of your place </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
        <Perks selected={perks} 
        onChange={setPerks}/>
        </div>

        {inputHeader('Extra Info')}
        <textarea className="textarea"/>
        {inputHeader('Check in and out , max guests')}
        <div className="grid sm:grid-cols-3 gap-3">
            <div>
                <h3> Check in</h3>
                <input type ='text'
                placeholder="Your check in time" className="input" 
                value={checkIn} 
                onChange={ev => setCheckIn(ev.target.value)}/>
            </div>
            <div>
                <h3> Check out</h3>
                <input type ='text'
                placeholder="Your check out time" className="input" value={checkOut} onChange={ev => setCheckOut(ev.target.value)}/>
            </div>
            <div>
                <h3> Maximimum guests </h3>
                <input type ='number'
                placeholder="Maximum no of guests that the place holds" className="input" 
                value={maxGuests}
                 onChange={ev => setMaxGuests(ev.target.value)}/>
            </div>
        </div>
        <button className="savebutton"> Save</button>
    </form>
</div>
)}
       
    </div>
    )
}