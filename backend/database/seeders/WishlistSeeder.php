<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Produit;
use App\Models\User;
use App\Models\Wishlist;


class WishlistSeeder extends Seeder
{
    public function run(): void
    {
        $clients = User::where('role', 'client')->get();

        foreach ($clients as $client) {
            // 2 à 5 produits en wishlist par client
            $produits = Produit::inRandomOrder()->take(rand(2, 5))->get();

            foreach ($produits as $produit) {
                // unique(['user_id','produit_id']) — on évite les doublons
                Wishlist::firstOrCreate([
                    'user_id'    => $client->id,
                    'produit_id' => $produit->id,
                ]);
            }
        }
    }
}