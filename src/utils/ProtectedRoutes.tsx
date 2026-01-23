//Implementar estado GLOBAL para que cambie si se loguea
//Igual necesitamos una DB para poder hacer eso 

import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () =>{
    const user = null
    return user ? <Outlet/> : <Navigate to= "/login"/>
}
export default ProtectedRoute