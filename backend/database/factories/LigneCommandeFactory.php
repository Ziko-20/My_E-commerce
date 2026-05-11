<?php

namespace Database\Factories;

use App\Models\Commande;
use App\Models\Produit;
use Illuminate\Database\Eloquent\Factories\Factory;

class LigneCommandeFactory extends Factory
{
    public function definition(): array
    {
        $produit  = Produit::inRandomOrder()->first();
        $quantite = $this->faker->numberBetween(1, 5);

        return [
            'commandes_id' => Commande::inRandomOrder()->first()->id,
            'produit_id'   => $produit->id,
            'quantite'     => $quantite,
            'sous_total'   => $produit->prix * $quantite,
        ];
    }
}