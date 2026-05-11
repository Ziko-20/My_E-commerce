import axios from "axios";

const API_URL="http://localhost:8000/api";


//recup des produits
export const getProduits=async()=>{
    const response=await axios.get('http://localhost:8000/api/produits');
    return response;

};

//recup des produits par ID
export const getProduitById=async(id)=>{
    const response = await axios.get(`http://localhost:8000/api/produits/${id}`);
    return response;

};


//reuperation par cetegorie

export const getCategories=async()=>{                                                                                                                               

    const response = await axios.get('http://localhost:8000/api/produits/categories');
    return response;

};


//////////////////////////////////////////////////////////////////////////////////////////////////////////

//ajouter unn produit
export const adminCreateProduit=async(produitData)=>{
    const token=localStorage.getItem('token');
    const response=await axios.post("http://localhost:8000/api/produits", //ou enviyerrr
        produitData,// quoi envoyer
        {headers:{Authorization:'Bearer ' + token  }});//car la route est proteger on doit savoir qui veut faire l action

    return response;
    
}
