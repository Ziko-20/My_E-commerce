<?php

namespace Database\Factories;

use App\Models\Produit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class WishlistFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id'    => User::where('role','client')
                                ->inRandomOrder()->first()->id,
            'produit_id' => Produit::inRandomOrder()->first()->id,
        ];
    }
}