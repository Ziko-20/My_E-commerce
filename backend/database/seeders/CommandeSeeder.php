<?php

namespace Database\Seeders;

use App\Models\Commande;
use Illuminate\Database\Seeder;

class CommandeSeeder extends Seeder
{
    public function run(): void
    {
        Commande::factory()->count(50)->create();
    }
}