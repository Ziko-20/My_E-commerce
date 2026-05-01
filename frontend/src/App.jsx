import { Routes,Route, useLocation  } from "react-router-dom"
import Profil from "./Pages/Profil"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Products from "./Pages/Products"
import NotFound from "./Pages/NotFound"
import { animate, AnimatePresence } from "framer-motion"
import TransitionRegister from "./components/TransitionRegister"
function App() {
  const location=useLocation();
  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<TransitionRegister><Login/></TransitionRegister>}/>
      <Route path="/register" element={<TransitionRegister><Register/></TransitionRegister>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/profil" element={<Profil/>}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
    </AnimatePresence>
  )
} 

export default App
