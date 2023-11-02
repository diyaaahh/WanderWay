import { useEffect , useState} from "react";
import axios from 'axios'


function HomePage(){

  const[places, setPlaces] =useState([]);

  useEffect(()=> {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    })
  },[])

  return(
    <div className=" mt-5 grid grid-cols-2 md:grid-cols-3 lg: grid-cols-4 gap-x-5 gap-y-8"> 
      {places.length > 0 && places.map(place =>(
        <div key={place._id} >
          <div className="bg-gray-500 rounded-2xl mb-2">
          {place.addedPhotos?.[0] && (
            <img  className = 'rounded-2xl aspect-square object-cover' src = {'http://localhost:4000/uploads/' + place.addedPhotos?.[0]} alt ='err'/>
          )}
          </div>
          <h2 className="font-bold"> {place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1"> Rs {place.price} per night</div>
        </div>
      ))}
     </div>
    
  )
}
export default HomePage;