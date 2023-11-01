import {BsDoorOpen} from "react-icons/bs"
import{MdOutlinePets} from "react-icons/md"
import{AiFillCar} from "react-icons/ai"
import{AiOutlineWifi} from "react-icons/ai"
import{PiTelevisionSimpleLight} from "react-icons/pi"

export default function Perks({selected , onChange}){

    function handleCbClick(ev){
        const {checked, name}=ev.target;
        if(checked){
            onChange([...selected,name])
        }else{
            onChange([...selected.filter(selectedName => selectedName !== name)])
        }

    }

    return(
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick}/>
                <AiOutlineWifi style={{fontSize:"1.25rem"}}/>
                <span> Wifi </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('parking')}  name = "parking"onChange={handleCbClick}/>
                <AiFillCar style={{fontSize:"1.25rem"}}/>
                <span> Free parking </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCbClick}/>
                <PiTelevisionSimpleLight style={{fontSize:"1.25rem"}}/>
                <span> TV </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick}/>
                <MdOutlinePets style={{fontSize:"1.25rem"}}/>
                <span> Pets </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox" checked={selected.includes('entrance')} 
                name="entrance"
                onChange={handleCbClick}/>
                <BsDoorOpen style={{fontSize:"1.25rem"}}/>
                <span> Private entrance</span>
            </label>
        </>
    );  
} 