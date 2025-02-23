import { Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "../pages/SignIn/Index";
import {SignUp} from "../pages/SignUp"

export function AuthRoutes(){
    const user = sessionStorage.getItem("@rocketnotes:user")
return(
    <Routes>
       <Route path="/" element={<SignIn/>}/>
       <Route path="/register" element={<SignUp/>}/>

       { !user && <Route path="*" element={<Navigate to="/"/>} />}
    </Routes>
)
}