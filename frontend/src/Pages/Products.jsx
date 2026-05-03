import React, { useEffect,useState } from 'react'
import { data } from 'react-router-dom';
import {ShoppingCart,Search,Funnel} from 'lucide-react'
import { useTranslation } from 'react-i18next';
import Navbar from '../Layouts/Navbar';


const Products = () => {
  
  const {t}=useTranslation();

  const [produits, setProduits] = useState([]);
  
  useEffect(()=>{
    fetch('https://dummyjson.com/products')
    .then(res=>res.json())
    .then(data=>setProduits(data.products))
  },[])
  return (
    <div className='bg-[#f8f9ff]'>
      <Navbar/>
      {/* search Bar */}
      <div className='flex w-full  justify-center items-center mt-8 h-full '>
<div className='relative flex items-center justify-center'>
  <Search className=' absolute left-4'/>
        <input type="text" className=' border pl-14 sm:w-lg md:w-xl lg:w-xxl h-12 rounded-2xl'  placeholder='Rechercher votre produit par son nom'/>
</div>
{/* Filtration par categorie */}
<div className='flex absolute right-12'><Funnel /> 
                <select name="" id="">
                  <option value="" className='font-bold'>{t('filtrer')}</option>
                  <option value="" className='font-bold'>Categorie 1</option>
                  <option value="" className='font-bold'>Categorie 2</option>
                  <option value="" className='font-bold'>Categorie 3</option>
                    </select> </div>
    
       
       
      </div>

       
<div   className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 '> 
       {produits.map((p,index)=>{ 

          return(
          <div key={index} className='flex flex-col border rounded-lg p-8 m-10  bg-[#eff4ff]'>

<div className='flex flex-col gap-2 h-full  '>

             <div className='flex justify-end'><p className='flex border rounded-lg w-8 items-center justify-center'>{p.stock}</p></div> 
             {/* Image du produit */}
             
             <div className='flex items-center justify-center  '>
              <img src={p.thumbnail} alt={p.title} className=' w-64 '/>
              </div> 
              <hr />
 
              {/* nom du produit */}
               <h3 className='font-bold mt-2 text-2xl '>{p.title}</h3> 

              {/* description produit */}
               <p className='flex-1 text-sm'>{p.description}</p> 

              {/* prix du produit */}
               <p className='font-bold text-2xl mt-2'>{p.price} DH</p> 

              {/* Boutton add to cart */}
               
               <a href="#" className='flex border gap-3 w-full font-bold rounded-lg items-center justify-center p-1 '>
                <ShoppingCart  />  {t('addToCart')}
                </a>  

              </div>
             </div>
            );
            })} 
            </div>

        

          
     
    </div>
  )
}

export default Products;
          

       

 
