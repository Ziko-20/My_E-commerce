<?php

namespace Database\Seeders;

use App\Models\Categorie;
use Illuminate\Database\Seeder;

class CategorieSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Électronique',
            'Vêtements',
            'Alimentation',
            'Maison',
            'Sport',
            'Beauté',
            'Livres',
            'Jouets',
        ];

        foreach ($categories as $cat) {
            Categorie::create(['categorie' => $cat]);
        }
    }
}