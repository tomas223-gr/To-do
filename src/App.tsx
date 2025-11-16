//Se usa protecter route, con los componentes navigate o Outlet de react router dom
import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Profile from "./Profile";
import Login from "./Login"
import ProtectedRoute from "./utils/ProtectedRoutes"

function App() {
  return (
       <BrowserRouter>
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute/>}>
           <Route path="/profile" element={<Profile />}/>
          <Route  path="/" element={<Dashboard />}  />
        </Route>
        <Route  path="/profile" element={<Profile />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;