import React, { useEffect, useState } from 'react'
import { ShoppingCart, Search, Funnel } from 'lucide-react'
import { useTranslation } from 'react-i18next';
import Navbar from '../Layouts/Navbar';
import { useNavigate } from 'react-router-dom';

const Products = () => {

  const { t } = useTranslation();
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panier,setPanier]=useState();
  const navigate=useNavigate();

  /* Fonction AJouter au panier */
  const HandlePanier=( )=>{
     
  }

  useEffect(() => {

   fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((data) => {

        setProduits(data.products); 
        setLoading(false);
      })  
      .catch(() => setLoading(false));
  }, []);  

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
            />
          </div>

          {/* Filtration */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 h-12 shadow-sm">
            <Funnel size={16} className="text-gray-400" />
                <select className="text-sm text-gray-600 bg-transparent focus:outline-none cursor-pointer">

              <option value="">{t('filtrer')}</option>
              <option value="">Categorie 1</option>
              <option value="">Categorie 2</option>
              <option value="">Categorie 3</option>
            </select>
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
                onClick={()=>{navigate(`/products/${p.id}`)}}
              >

                {/* Stock */}
                <div className="flex justify-between items-center mb-3">
                  {/* <span className="text-xs font-medium text-white bg-blue-500 px-2 py-1 rounded-full">
                    {p.category}
                  </span> */}
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.stock > 50? 'bg-green-50 text-green-600': p.stock > 10? 'bg-amber-50 text-amber-600': 'bg-red-50 text-red-500'}`}>
                    {p.stock} disponible en stock
                  </span>
                </div>

                {/* Image du produit */}
                <div className="flex items-center justify-center h-44 bg-gray-50 rounded-xl mb-4">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="h-full w-auto object-contain p-2"
                  />
                </div>

                {/* nom produit */}
                <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-1">
                  {p.title}
                </h3>

                {/* description */}
                <p className="flex-1 text-xs text-gray-400 mt-1 line-clamp-2">
                  {p.description}
                </p>
                <span className="text-xs font-medium text-black  px-2 py-1 rounded-full">
                    {t("category")} : {p.category}
                  </span>

                {/* prix du produit */}
                <p className="font-bold text-gray-800 text-lg mt-3">
                  {p.price} DH
                </p>

                {/* Boutttttttton */}
                <button
                onClick={(e) => { e.stopPropagation(); HandlePanier(); }}
                  type="button"
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
    </div>
  );
};

export default Products;