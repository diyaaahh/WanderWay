import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import HomePage from "./components/homepage";
import LoginPage from "./components/loginpage";
import "./App.css";
import RegisterPage from "./components/registerpage";
import AccountPage from "./components/account";
import axios from "axios"
import PlacesPage from "./components/places";
import { UserContextProvider } from "./userContext";
import PlacesFormPage from "./components/placesFormPage";

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials= true;
function App() {
  return (
   <UserContextProvider>
    <Routes>
          <Route path="/" element={<Layout />} >
            <Route path='/' element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path ="/account/:subpage?" element={<AccountPage/>}/>
            <Route path="/account/pages/:action" element={<PlacesPage/>}/>
            <Route path ='/account/places/:id' element ={<PlacesFormPage/>}/>
          </Route>
        </Routes>
       </UserContextProvider>
  );
}

export default App;
