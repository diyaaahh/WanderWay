import { Link, useParams } from "react-router-dom";
import "./places.css"
import { Navigate } from "react-router-dom";
import {BsPlusCircle} from "react-icons/bs"
import { useState } from "react";
import Perks from "./perks";
import axios from 'axios'
import PhotosUploader from "../photosUploader";
import { useEffect } from "react";

export default function PlacesFormPage(){
   
    const{id}=useParams()
    const[title,setTitle]=useState('')
    const[address, setAddress]=useState('')
    const[description, setDescription]=useState('')
    const[perks,setPerks]=useState('')
    const [extraInfo, setExtraInfo]=useState('')
    const[addedPhotos , setAddedPhotos] = useState([])
    const[checkIn, setCheckIn]= useState('')
    const[checkOut, setCheckOut]= useState('')
    const[maxGuests , setMaxGuests]= useState(1)
    const [redirect , setRedirect] = useState('')
    
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/places/'+id).then(response =>{
            const {data} = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.addedPhotos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
        }
        )

    }, [id])

    function inputHeader(text){
        return(
            <h2 className=" mt-4 text-2xl"> {text} </h2>   
        )
    }
    

   async function savePlace(ev){
        ev.preventDefault();
       const placeData = {title,address, addedPhotos,description,perks,extraInfo, checkIn ,checkOut , maxGuests}

       if(id){
        await axios.put('/places' ,{id ,...placeData})
       setRedirect('/account/places')   //update
       }
       else {
       await axios.post('/places' , placeData)
       setRedirect('/account/places')}  //create new
    }
    if(redirect){
        return <Navigate to ={redirect} />
    }
   



return (
    <>
        <div className="ml-5"> 
    <form onSubmit={savePlace}> 
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
       <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>

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
        <textarea className="textarea"
        value ={extraInfo}
        onChange={ev => setExtraInfo(ev.target.value)}
        />
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
    </>
)
}