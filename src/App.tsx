import Dashboard from "./Dashboard";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRute";
import Login from "./Login"
function App() {
  return (
       <BrowserRouter>
       <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
