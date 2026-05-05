import { Routes,Route, useLocation  } from "react-router-dom"
import Profil from "./Pages/Profil"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Products from "./Pages/Products"
import NotFound from "./Pages/NotFound"
import Navbar from './Layouts/Navbar'
import ProductDetail from './Pages/ProductDetail'


import AddProduct from './Pages/Admin/AddProduct';


import { animate, AnimatePresence } from "framer-motion"
import TransitionRegister from "./components/TransitionRegister"
function App() {
  const location=useLocation();
  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
{/* login et register */}
      <Route path="/" element={<TransitionRegister><Login/></TransitionRegister>}/>
      <Route path="/register" element={<TransitionRegister><Register/></TransitionRegister>}/>
{/* Clients */}
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/profil" element={<Profil/>}/>
{/* Admin */}
      <Route path="/addproductadmin" element={<AddProduct/>}/>

{/* -------------------- */}
      <Route path="/navbar" element={<Navbar/>}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
    </AnimatePresence>
  )
} 

export default App
