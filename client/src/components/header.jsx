import './header.css'
import { AiOutlineSearch } from "react-icons/ai";
import{BsFillPersonFill} from "react-icons/bs";
import{GiHamburgerMenu} from "react-icons/gi";
import {FcDebian} from "react-icons/fc";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from '../userContext';


function Header(){

  const{user}= useContext(UserContext)
    return(
        <div className="header"> 
    <h3>
      <Link className="logo" to ='/'><FcDebian  style={{ fontSize: "3rem"}}/>
      <span className="WanderWay"> WanderWay</span>
      </Link>
    </h3>
   

    <div className="searchbar">
      <div className="Anywhere">Anywhere </div>
      <div className="Anyweek"> Anyweek </div>
      <div className="Addguests"> Add guests </div>
      <button className="searchbutton bg-primary text-white p-2 rounded-full"> <AiOutlineSearch style={{fontSize:"1rem"}}/></button>
    </div>

    <Link to ={user? '/account ':'/login'}className="sidepanel"> 
    <div className="hamburger"> <GiHamburgerMenu style={{fontSize:"1.25rem"}}/> </div>
    <div className="user" > <BsFillPersonFill style={{fontSize:"1.25rem"}}/> </div>
    {!!user &&(
      <div>
        {user.name}
      </div>
    )}
    </Link>
   </div>
    )
}

export default Header;