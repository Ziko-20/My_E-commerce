<?php

namespace Database\Seeders;

use App\Models\Produit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class ProduitSeeder extends Seeder
{
    public function run(): void
    {
       

        Produit::factory()->count(60)->create();
    }
}