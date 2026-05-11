<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    public function definition(): array
    {
        $prenoms = ['Youssef','Fatima','Mohammed','Zineb','Amine','Khadija',
                    'Omar','Salma','Khalid','Nadia','Hamza','Meryem','Rachid',
                    'Houda','Karim','Soukaina','Ayoub','Imane','Bilal','Hajar'];

        $noms = ['Benali','Idrissi','Chaoui','Tahiri','Bensaid','Alaoui',
                 'Naciri','Fassi','Berrada','Kettani','Mrabet','Ziani',
                 'Tazi','Benomar','Lahlou'];

        $villes = ['Casablanca','Rabat','Marrakech','Fès','Tanger',
                   'Agadir','Meknès','Oujda','Tétouan','Salé'];

        $prenom = $this->faker->randomElement($prenoms);
        $nom    = $this->faker->randomElement($noms);
        $ville  = $this->faker->randomElement($villes);

        return [
            'name'      => "$prenom $nom",
            'email'     => strtolower($prenom).'.'
                           .strtolower($nom).'.'
                           .$this->faker->randomNumber(3).'@gmail.com',
            'telephone' => '0'.($this->faker->boolean ? '6' : '7')
                           .$this->faker->numerify('########'),
            'adresse'   => $this->faker->randomNumber(3).' Rue '
                           .$this->faker->randomElement([
                               'Hassan II','Mohammed V','Al Massira',
                               'Ibn Khaldoun','Al Quds','Zerktouni'
                           ]).', '.$ville,
            'password'  => Hash::make('password123'),
            'role'      => 'client',
        ];
    }
}