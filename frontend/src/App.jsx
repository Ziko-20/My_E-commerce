import { Routes,Route } from "react-router-dom"
import Profil from "./Pages/Profil"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import NotFound from "./Pages/NotFound"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/profil" element={<Profil/>}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default App
