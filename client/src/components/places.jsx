import { Link, useParams } from "react-router-dom";
import "./places.css"
import { Navigate } from "react-router-dom";
import {BsPlusCircle} from "react-icons/bs"
import { useState } from "react";
import Perks from "./perks";
import axios from 'axios'
import PhotosUploader from "../photosUploader";
import { useEffect } from "react";
import PlacesFormPage from "./placesFormPage";

export default function PlacesPage(){

    const [places, setPlaces]=useState([])

    useEffect(()=>{
        axios.get('/places').then(({data})=>{
            setPlaces(data)
        })
    }, [])
    const {action} = useParams();

return(

<div>
        {action !== 'new' &&(
<div>
 <div className="divforaddnewplaces">    
 <Link className="addnewplaces" to ={'/account/pages/new'}> <BsPlusCircle style={{ fontSize: "1.3rem"}}/>   Add new places</Link>
 </div>
 <div className="mt-4"> 
    {places.length >0 && places.map(place => (
        <Link to ={'/account/places/'+place._id} key ={place._id} className="flex bg-gray-200 p-4 rounded-2xl gap-4 cursor-pointer">
            <div className="flex w-32 h-32 bg-gray-100 ">
                {place.addedPhotos.length > 0 && (
                    <img className="image"  src ={'http://localhost:4000/uploads/'+place.addedPhotos[0]} alt ="err"/>
                )}
            </div>
            <div className="grow-0 shrink">
           <h2 className="text-xl"> {place.title} </h2>
           <p className="text-sm mt-2 "> {place.description}</p>
           </div>
        </Link>
    ))}
</div> 
 </div>
        )

        }
{action == 'new' && (
    <PlacesFormPage/>

)}
       
    </div>
    )
}