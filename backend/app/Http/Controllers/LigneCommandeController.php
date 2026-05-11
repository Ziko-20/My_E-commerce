<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Produit;
use Illuminate\Http\Request;

class LigneCommandeController extends Controller
{
    public function store(Request $request, $id)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
            'quantite'   => 'required|integer|min:1',
        ]);

        $commande = Commande::findOrFail($id);
        $produit  = Produit::findOrFail($request->produit_id);

        if ($produit->stock_produit < $request->quantite) {
            return response()->json(['message' => 'Stock insuffisant'], 422);
        }

        LigneCommande::create([
            'commandes_id' => $commande->id,
            'produit_id'   => $produit->id,
            'quantite'     => $request->quantite,
            'sous_total'   => $request->quantite * $produit->prix,
        ]);

        $produit->decrement('stock_produit', $request->quantite);
        $commande->update(['total' => $commande->ligne_commande()->sum('sous_total')]);

        return response()->json(['message' => 'Ligne ajoutée', 'commande' => $commande], 201);
    }

    public function update(Request $request, $id, $ligne)
    {
        $request->validate([
            'quantite' => 'required|integer|min:1',
        ]);

        $commande      = Commande::findOrFail($id);
        $ligneCommande = LigneCommande::findOrFail($ligne);
        $produit       = Produit::findOrFail($ligneCommande->produit_id);

        // Remettre l'ancien stock avant de vérifier
        $produit->increment('stock_produit', $ligneCommande->quantite);

        if ($produit->stock_produit < $request->quantite) {
            $produit->decrement('stock_produit', $ligneCommande->quantite);
            return response()->json(['message' => 'Stock insuffisant'], 422);
        }

        $produit->decrement('stock_produit', $request->quantite);

        $ligneCommande->update([
            'quantite'   => $request->quantite,
            'sous_total' => $request->quantite * $produit->prix,
        ]);

        $commande->update(['total' => $commande->ligne_commande()->sum('sous_total')]);

        return response()->json(['message' => 'Ligne mise à jour', 'commande' => $commande]);
    }

    public function destroy($id, $ligne)
    {
        $commande      = Commande::findOrFail($id);
        $ligneCommande = LigneCommande::findOrFail($ligne);
        $produit       = Produit::findOrFail($ligneCommande->produit_id);

        $produit->increment('stock_produit', $ligneCommande->quantite);
        $ligneCommande->delete();
        $commande->update(['total' => $commande->ligne_commande()->sum('sous_total')]);

        return response()->json(['message' => 'Ligne supprimée']);
    }
}