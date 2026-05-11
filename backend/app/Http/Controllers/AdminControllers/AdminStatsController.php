<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Produit;

class AdminStatsController extends Controller
{
    public function index()
    {
        $chiffreAffaires = Commande::sum('total');

        $topProduits = LigneCommande::selectRaw('produit_id, SUM(quantite) as total_vendu')
            ->groupBy('produit_id')
            ->orderByDesc('total_vendu')
            ->with('produit')
            ->limit(5)
            ->get();

        $stocks = Produit::select('id', 'nom_prduit', 'stock_produit')
            ->orderBy('stock_produit')
            ->get();

        return response()->json([
            'chiffre_affaires' => $chiffreAffaires,
            'top_produits'     => $topProduits,
            'stocks'           => $stocks,
        ]);
    }
}