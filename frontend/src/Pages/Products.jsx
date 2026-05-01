import React, { useEffect } from 'react'
import { data } from 'react-router-dom';



const Products = () => {
  const [produits, setProduits] = useState([]);
  
  useEffect(()=>{
    fetch('https://dummyjson.com/products')
    .then(res=>res.json())
    .then(data=>setProduits(data.products))
  })
  return (
    <div>

      
    </div>
  )
}

export default Products

