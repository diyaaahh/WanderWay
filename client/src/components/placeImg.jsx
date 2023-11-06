import Image from "./image.jsx";

export default function PlaceImg({place,index=0,className=null}) {
  if (!place.addedPhotos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <Image className={className} src={place.addedPhotos[index]} alt=""/>
  );
}