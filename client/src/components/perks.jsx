import {BsDoorOpen} from "react-icons/bs"
import{MdOutlinePets} from "react-icons/md"
import{AiFillCar} from "react-icons/ai"
import{AiOutlineWifi} from "react-icons/ai"
import{PiTelevisionSimpleLight} from "react-icons/pi"

export default function Perks(selected , onChange){
    return(
        <>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <AiOutlineWifi style={{fontSize:"1.25rem"}}/>
                <span> Wifi </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <AiFillCar style={{fontSize:"1.25rem"}}/>
                <span> Free parking </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <PiTelevisionSimpleLight style={{fontSize:"1.25rem"}}/>
                <span> TV </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <MdOutlinePets style={{fontSize:"1.25rem"}}/>
                <span> Pets </span>
            </label>
            <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input type="checkbox"/>
                <BsDoorOpen style={{fontSize:"1.25rem"}}/>
                <span> Private entrance</span>
            </label>
        </>
    );  
} 