<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LigneCommande;
use App\Models\Produit;
use App\Models\Commande;

class LigneCommandeController extends Controller
{
    public function store(Request $request,$id){

        $validated=$request->validate([
            'quantite'=>'required|integer|min:1',
            'produit_id'=>'required|exists:produits,id'
        ]);
        
        $commande=Commande::findOrFail($id);

        $produit=Produit::findOrFail($request->produit_id);

        if($produit->stock_produit<$request->quantite){
            return response()->json([

                "success"=>false,
                "message"=>"Produit n'est plus disponible"]
               , 422);
        }
        $sous_total=$request->quantite*$produit->prix;
        LigneCommande::create([
            "produit_id"=>$produit->id,
            "commandes_id"=>$commande->id,
            "quantite"=>$request->quantite,
            "sous_total"=>$sous_total
        ]);

            $total = $commande->ligne_commande()->sum('sous_total');
            $commande->update(['total' => $total]);
                return response()->json([

                    'message' => 'Ligne ajoutée',
                 'commande' => $commande
                ], 201);



    }
}

