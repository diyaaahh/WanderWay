import "./loginpage.css"
import {Link, Navigate} from "react-router-dom"
import { useState } from "react";
import axios from 'axios';
import { useContext } from "react";
import { UserContext } from "../userContext";

function LoginPage(){

    const[email, setEmail]=useState('');
    const [password , setPassword] = useState('');
    const[redirect , setRedirect] = useState( false )
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login' , {email, password})
            setUser(data)
            alert('Logged in sucessfully')
            setRedirect(true);
        }

    catch(error){
        console.log('error', error);
        alert('Login failed!')
    }
    }

    if(redirect){
        return<Navigate to = {'/'}/>
    }

    return(
       <div>
        <h1 className="text-4xl text-center mt-20"> Login</h1>
        <form className="form" onSubmit={handleLoginSubmit}> 
        <div className="input-container">
            <input  className= "h-10 p-3 rounded-xl " type="email" placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)}/>
            <input type ="password" placeholder="password"
            value ={password}
            onChange={ev => setPassword(ev.target.value)} />
            <button className="loginbutton"> Login </button>
            <div className="linktoregister"> Don't have an account yet?
                <Link to={'/register'} className='registerlink'>   Register</Link>
            </div>
        </div>
        </form>
       </div>
    )
}

export default LoginPage;