import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import TransitionRegister from "./components/TransitionRegister";
import NotFound from './components/NotFound';


// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Client
import Products from './pages/client/Products';
import ProductDetail from './pages/client/ProductDetail';
import Panier from './pages/client/Panier';
import Commandes from './pages/client/Commandes';
import CommandeDetail from './pages/client/CommandeDetail';
import Wishlist from './pages/client/Wishlist';
import Profil from './pages/client/Profil';

// Admin
import Dashboard from './Pages/admin/Dashboard';
import AdminProduits from './Pages/admin/AdminProduits';
import AdminProduitForm from './Pages/admin/AdminProduitForm';
import AdminCategories from './Pages/admin/AdminCategories';
import AdminClients from './Pages/admin/AdminClients';
import AdminCommandes from './Pages/admin/AdminCommandes';


import { CartProvider } from './context/CartContext';

function App() {
  const location = useLocation();

  return (
    <CartProvider>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/*login/registerr*/}
        <Route path="/" element={<TransitionRegister><Login /></TransitionRegister>} />
        <Route path="/register" element={<TransitionRegister><Register /></TransitionRegister>} />

        {/*clients*/}
        <Route path="/produits" element={ <Products /> } />
        <Route path="/produits/:id" element={ <ProductDetail /> } />
        <Route path="/panier" element={<Panier />} />
        <Route path="/commandes" element={<Commandes />} />
        <Route path="/commandes/:id" element={<CommandeDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profil" element={<Profil />} />

        {/* admin routtttttttessss*/}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/produits" element={<AdminProduits />} />
        <Route path="/admin/produits/add" element={<AdminProduitForm />} />
        <Route path="/admin/produits/edit/:id" element={<AdminProduitForm />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/commandes" element={<AdminCommandes />} />

         {/* link introuvable */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </AnimatePresence>
    </CartProvider>
  );
}

export default App;