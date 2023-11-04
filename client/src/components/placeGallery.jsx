import {useState} from "react";
import{MdInsertPhoto} from 'react-icons/md'
import{RxCross1} from 'react-icons/rx'
import Image from "./image.jsx";

export default function PlaceGallery({place}) {
    const gapSize="2px";
  const [showAllPhotos,setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
            <RxCross1 style={{fontSize:'1.25rem'}}/>
              Close photos
            </button>
          </div>
          {place?.addedPhotos?.length > 0 && place.addedPhotos.map(photo => (
            <div>
              <Image src={photo} alt=""/>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden mx-auto">
        <div>
          {place.addedPhotos?.[0] && (
            <div>
              <Image onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover " src={place.addedPhotos[0]} alt=""/>
            </div>
          )}
        </div>
        <div className="grid">
          {place.addedPhotos?.[1] && (
            <Image onClick={() => setShowAllPhotos(true)} className=" aspect-square cursor-pointer object-cover " src={place.addedPhotos[1]} alt=""/>
          )}
          <div className="overflow-hidden">
            {place.addedPhotos?.[2] && (
              <Image onClick={() => setShowAllPhotos(true)} className="aspect-square cursor-pointer object-cover " src={place.addedPhotos[2]} alt=""/>
            )}
          </div>
        </div>
      </div>
      <button onClick={() => setShowAllPhotos(true)} className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow shadow-md shadow-gray-500">

        <MdInsertPhoto style={{fontSize:'1.25rem'}}/>
        Show more photos
      </button>
    </div>
  );
}