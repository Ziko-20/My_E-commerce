<?php

namespace App\Http\Controllers;
 

use Illuminate\Http\Request;

use App\Models\Produit;
use App\Models\Categorie;
class ProduitController extends Controller
{
    public function index(Request $request){
        /* $produits=Produit::all();
        return view(index,compact("data")); */
        $query=Produit::query();
        /* filotration */


/* recherche de produit par nom */
        if($request->has('nom_produit')){
            $query->where('nom','like','%'.$request->nom_produit.'%');
        }


/* filtretion par prix inferieur ou egal au prix donnee par l utilisateur */
        if($request->has('prix')){
            $query->where('prix', '<=', $request->prix);
        }

/* Filtration par categorie */        

        if($request->has('categorie')){
            $query->where('categorie','='.$request->categorie);
        }

        $produits=$query->get();
        return response()->json([
            "success"=>true,
            "data"=>$produits
        ],200);

    }

    public function show($id){

       $produit=Produit::findOrFail($id);
        return response()->json([
            "success"=>true,
            "data"=>$produit
        ],200);
    }

}
