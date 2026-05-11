import React, { useEffect, useState } from 'react'
import {Search,Funnel,ShoppingCart} from 'lucide-react'
import Navbar from '../../components/Navbar';
import { getProduits } from '../../services/productService';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCategories } from '../../services/productService';
import { getProduitsFilter } from '../../services/productService'; 

import { useCart } from '../../context/CartContext';
import { ajouterLigne } from '../../services/productService';

const Products = () => {
  
  const {t}=useTranslation();
  const [loading, setLoading] = useState(true);
  const [panier,setPanier]=useState();
  const navigate=useNavigate();
  const [search,setSearch]=useState('');
  const[categories, setCategories]=useState([]);
  const[categorieId, setCategorieId]=useState('');
  const[prixMax,setPrixMax]=useState('');

  const [page,setPage] =useState(1);
  const [lastPage,setLastPage] =useState(1);

  const [produits,setProduits]=useState([]);


 

  useEffect(()=>{

    /* getProduits()
    .then((response)=>{
      console.log(response.data.data);
      
      setProduits(response.data.data);

      setLoading(false);}); */

      getCategories().then((response) => {

    setCategories(response.data.data);
     
  });
    

  },[categorieId,search,prixMax])

  useEffect(() => {
  getProduitsFilter(search, prixMax, categorieId, page).then((response) => {
    
    setProduits(response.data.data.data );
     
    setLastPage(response.data.data.last_page);
    setLoading(false);
   
  });

}, [search, prixMax, categorieId, page]);
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, [page]);

  //add to cart
  
  const { getPanierID } = useCart();

  const handleAjouterAuPanier = async (produitId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Connecte-toi d'abord !");
      navigate('/');
      return;
    }
    try {
      const id = await getPanierID(); // cree ou recup le panier
      await ajouterLigne(id, produitId, 1);
      alert('Produit ajouté au panier ✅');
    } catch (err) {
      alert('Erreur : ' + (err.response?.data?.message || 'Stock insuffisant'));
    }
  };


  return (
     <div className="min-h-screen bg-[#f8f9ff]">
      <Navbar />
  
      {/*  */}
      <div className="px-6 py-8 max-w-screen-xl mx-auto">
 
        {/* search Bar */}
        <div className="flex items-center gap-4 mb-8"> 

          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              className="w-full border border-gray-200 bg-white pl-11 pr-4 h-12 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100 placeholder:text-gray-400 text-sm"
              placeholder="Rechercher votre produit par son nom"
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
            />
          </div>

          {/* Filtration */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 h-12 shadow-sm">
            <Funnel size={16} className="text-gray-400" />
                <select className="text-sm text-gray-600 bg-transparent focus:outline-none cursor-pointer"
                value={categorieId} 
                onChange={(e) => setCategorieId(e.target.value)}>

              <option value="">Toutes les catégories</option>
              {categories.map((c) => (
    <option key={c.id} value={c.id}>{c.categorie}</option>
  ))}
            </select>
            <input
  type="number"
  value={prixMax}
  onChange={(e) => setPrixMax(e.target.value)}
  placeholder="Prix max"
/>
          </div>

        </div>

        {/* Grille produits */}
        {loading ? (
          <div className="flex justify-center items-center h-64 text-gray-400 text-sm">
            Chargement...
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produits.map((p) => (
              <div
                key={p.id}
                className="flex  bg-white flex-col border border-gray-100  rounded-xl  p-5  hover:shadow-md transition-shadow   duration-200 cursor-pointer"
                onClick={()=>{navigate(`/produits/${p.id}`)}}
              >

                {/* Stock */}
                <div className="flex justify-between items-center mb-3">
                  {/* <span className="text-xs font-medium text-white bg-blue-500 px-2 py-1 rounded-full">
                    {p.category}
                  </span> */}
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.stock_produit > 50? 'bg-green-50 text-green-600': p.stock_produit > 10? 'bg-amber-50 text-amber-600': 'bg-red-50 text-red-500'}`}>
                    {p.stock_produit} disponible en stock
                  </span>
                </div>

                {/* Image du produit */}
                <div className="flex items-center justify-center h-44 rounded-xl mb-4">
                  <img
                    src={p.image}
                    alt={p.nom_prduit}
                    className="h-full w-auto object-contain p-2"
                  />
                </div>

                {/* nom produit */}
                <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-1">
                  {p.nom_prduit}
                </h3>

                {/* description */}
                <p className="flex-1 text-xs text-gray-400 mt-1 line-clamp-2">
                  {p.description_prduit}
                </p>
                <span className="text-xs font-medium text-black  px-2 py-1 rounded-full">
                    {t("category")} : {p.categorie_id}
                  </span>

                {/* prix du produit */}
                <p className="font-bold text-gray-800 text-lg mt-3">
                  {p.prix} DH
                </p>

                {/* Boutttttttton */}
                <button
                 
                  type="button"
                  onClick={(e)=>{
                    e.stopPropagation();
                    handleAjouterAuPanier(p.id);
                  }}
                  className="flex items-center justify-center gap-2 w-full  font-semibold text-white bg-green-500 hover:bg-green-700  rounded-xl p-2.5 mt-3 transition-all duration-200 text-sm hover:-translate-y-0.5"
                >
                  <ShoppingCart size={16} />
                  {t('addToCart')}
                </button>

              </div>
            ))}
          </div>
        )}

      </div>
      <div className="flex justify-center gap-2 mt-8 pb-4">
  
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    className="px-4 py-2 rounded-xl border text-sm disabled:opacity-40"
  >
    ←
  </button>

  {/* Numéros de pages */}
  {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
    <button
      key={p}
      onClick={() => setPage(p)}
      className={`px-4 py-2 rounded-xl border text-sm ${page === p ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
    >
      {p}
    </button>
  ))}
 
  <button
    onClick={() => setPage(page + 1)}
    disabled={page === lastPage}
    className="px-4 py-2 rounded-xl border text-sm disabled:opacity-40"
  >
    →
  </button>
</div>
    </div>
  );
}

export default Products;

