import axios from "axios";
import { useState , useParams} from "react";
import {AiOutlineCloudUpload} from "react-icons/ai"
import "./components/places.css"

export default function PhotosUploader({addedPhotos , onChange}) {


    const[photoLink , setphotoLink]=useState('')
    
    async function addPhotoByLink(ev){
        ev.preventDefault();
       const {data:filename}= await axios.post('/upload-by-link' ,{link:photoLink});
       onChange(prev =>{
        return[...prev ,filename];
       })
       setphotoLink('')
    }
   

    function uploadPhoto(ev){
      const files =  ev.target.files
      const data = new FormData()

      for( let i = 0 ; i< files.length ; i++){
          data.append('photos', files[i])
      }
      axios.post('/upload', data , {
        headers:{'Content-Type': 'multipart/form-data'}
      }).then(response =>{
        const{data:filenames} =response
        onChange(prev =>{
            return[...prev, ...filenames]
        })
      })
    }

    return(
        <>
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
        <label className="border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex gap-2 items-center cursor-pointer" > 
        <input type ='file' multiple  className="hidden" onChange={uploadPhoto}/>
        <AiOutlineCloudUpload style={{fontSize:"2rem"}}/>
        Upload 
        </label>
        </div>
        </>
    )
}