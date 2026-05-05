import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

import Navbar from '../Layouts/Navbar'; 

const ProductDetail = () => {

  const { id } = useParams();
  const navigate = useNavigate();
 
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => { setProduit(data); setLoading(false); })
      .catch(() => setLoading(false)); 
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-400">Chargement...</div>; 
  if (!produit) return <div className="flex justify-center items-center h-screen text-gray-400">Produit introuvable</div>; 

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-6 py-8"> 

        {/* returner a la page produits*/}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6">
          <ArrowLeft size={16} /> Retour aux produits
        </button>

        <div className="bg-white rounded-2xl p-8 shadow-sm grid md:grid-cols-2 gap-10">

          {/* imaAAAAAAAAAAAAAAAEGE */}
          <div className="flex items-center justify-center bg-gray-50 rounded-xl h-80">
            <img src={produit.thumbnail} alt={produit.title} className="h-full object-contain p-4" />
          </div>

          {/* descriptionn */}
          <div className="flex flex-col gap-4">
            <span className="text-xs text-blue-500 font-medium uppercase">{produit.category}</span>
            <h1 className="text-2xl font-bold text-gray-800">{produit.title}</h1>
            <p className="text-gray-400 text-sm">{produit.description}</p>

            {/* Note */}
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium">{produit.rating}</span>
            </div>

            {/* Stock */}
            <span className={`text-xs w-fit font-medium px-3 py-1 rounded-full ${

               produit.stock> 50 ? 'bg-green-50 text-green-600' :
              produit.stock> 10 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-500'
            }`}>
              {produit.stock} en stock
            </span>

            {/* Prix */}
            <p className="text-3xl font-bold text-gray-800">{produit.price} DH</p>

        <button 
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-xl p-3 transition-all duration-200 hover:-translate-y-0.5">
          <ShoppingCart size={18} /> Ajouter au panier </button>
             
           
   </div>
          
          </div>
        </div>












     </div>
  );
};

export default ProductDetail;