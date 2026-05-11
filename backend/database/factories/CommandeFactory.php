<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommandeFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id'       => User::where('role', 'client')
                                   ->inRandomOrder()->first()->id,
            'date_commande' => $this->faker->dateTimeBetween('-6 months', 'now')
                                          ->format('Y-m-d'),
            'total'         => 0, // recalculé après création des lignes
            'statut'        => $this->faker->randomElement([
                                   'en_attente','expediee','livree'
                               ]),
        ];
    }
}