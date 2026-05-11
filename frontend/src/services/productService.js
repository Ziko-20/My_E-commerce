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

    const response = await axios.get('http://localhost:8000/api/categories');
    return response;

};
/* filtration et recherche */

export const getProduitsFilter = async (nom, prix, categorie,page = 1) => {
  const response = await axios.get('http://localhost:8000/api/produits', {
    params: {
      nom_produit: nom,
      prix: prix,
      categorie: categorie,
      page:page
    }
  });
  return response;
};

const token = () => localStorage.getItem('token');
const headers = () => ({ Authorization: 'Bearer ' + token() });

//cration commande
export const creerCommande = async () => {
  const response = await axios.post(`${API_URL}/commandes`, {
    date_commande: new Date().toISOString().split('T')[0],
    total: 0,
    statut: 'en_attente'
  }, { headers: headers() });
  return response;
};

// Récupérer les commandes de l'utilisateur
export const getCommandes = async () => {
  const response = await axios.get(`${API_URL}/commandes`, { headers: headers() });
  return response;
};

// Ajouter une ligne au panier
export const ajouterLigne = async (commandeId, produitId, quantite) => {
  const response = await axios.post(
    `${API_URL}/commandes/${commandeId}/lignes`,
    { produit_id: produitId, quantite },
    { headers: headers() }
  );
  return response;
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//ajouter unn produit
export const adminCreateProduit=async(produitData)=>{
    const token=localStorage.getItem('token');
    const response=await axios.post("http://localhost:8000/api/admin/produits", //ou enviyerrr
        produitData,// quoi envoyer
        {headers:{Authorization:'Bearer ' + token  }});//car la route est proteger on doit savoir qui veut faire l action

    return response;
    
}
