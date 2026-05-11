<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Commande;
use App\Models\LigneCommande;
use App\Models\Produit;


class LigneCommandeSeeder extends Seeder
{
    public function run(): void
    {
        $commandes = Commande::all();

        foreach ($commandes as $commande) {
            // 2 à 4 lignes par commande
            $nbLignes = rand(2, 4);
            $total    = 0;

            // Produits différents par commande
            $produits = Produit::inRandomOrder()->take($nbLignes)->get();

            foreach ($produits as $produit) {
                $quantite   = rand(1, 5);
                $sous_total = $produit->prix * $quantite;
                $total     += $sous_total;

                LigneCommande::create([
                    'commandes_id' => $commande->id,
                    'produit_id'   => $produit->id,
                    'quantite'     => $quantite,
                    'sous_total'   => $sous_total,
                ]);
            }

            // Mettre à jour le total de la commande
            $commande->update(['total' => $total]);
        }
    }
}