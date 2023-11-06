import "./loginpage.css"
import {Link} from "react-router-dom"
import { useState } from "react";
import axios from "axios";


function RegisterPage(){
const [name,setName]=useState('');
const [email , setEmail]=useState('');
const [password,setPassword]= useState('');
async function registerUser(ev) {
    ev.preventDefault();
    try{
     await axios.post('/register' ,{
        name,
        email,
        password
    })
     alert('Registration sucessful!')   
    } catch(e){
        alert('Registration failed, please try again later')
    }

  }
  

    return (
        <div>
        <h1 className="text-4xl text-center mt-20"> Register</h1>
        <form className="form" onSubmit={registerUser}> 
        <div className="input-container">
            <input type="text" placeholder="Your name" 
             value={name} 
             onChange = {ev => setName(ev.target.value)}/>
            <input className="h-10 p-3 rounded-xl" type="email" placeholder="your@email.com" 
             value={email}
              onChange={ev => setEmail(ev.target.value)}/>
            <input type ="password" placeholder="password"
              value={password}
              onChange= {ev => setPassword(ev.target.value)} />
            <button className="loginbutton"> Register </button>
            <div className="linktoregister"> Already have an account?
                <Link to={'/login'} className='registerlink'>   Go to login</Link>
            </div>
        </div>
        </form>
       </div>
    )
}

export default RegisterPage