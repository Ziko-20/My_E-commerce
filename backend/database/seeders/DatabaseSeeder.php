<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    // ✅ Fix — ajoute tous les seeders dans l'ordre correct
public function run(): void
{
    $this->call([
        CategorieSeeder::class,   // 1. D'abord les catégories
        UserSeeder::class,        // 2. Ensuite les users
        ProduitSeeder::class,     // 3. Ensuite les produits
        CommandeSeeder::class,    // 4. Ensuite les commandes
        LigneCommandeSeeder::class, // 5. Ensuite les lignes
        WishlistSeeder::class,    // 6. Enfin la wishlist
    ]);
}
}
