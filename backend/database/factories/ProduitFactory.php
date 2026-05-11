<?php

namespace Database\Factories;

use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProduitFactory extends Factory
{
    // Produits par catégorie : nom, prix min/max DH, mot-clé image Unsplash
    private array $catalogue = [
        'Électronique' => [
            'produits' => [
                ['nom'=>'Samsung Galaxy A55','prix'=>[2999,4499],'img'=>'samsung-phone'],
                ['nom'=>'iPhone 15 128Go','prix'=>[12999,14999],'img'=>'iphone'],
                ['nom'=>'Laptop HP 15 pouces','prix'=>[5499,8999],'img'=>'laptop'],
                ['nom'=>'Casque Bluetooth JBL','prix'=>[499,999],'img'=>'headphones'],
                ['nom'=>'Tablette Lenovo Tab','prix'=>[1999,3499],'img'=>'tablet'],
                ['nom'=>'Montre connectée Xiaomi','prix'=>[799,1499],'img'=>'smartwatch'],
                ['nom'=>'Clé USB 64Go','prix'=>[89,199],'img'=>'usb-drive'],
                ['nom'=>'Écran PC 24 pouces','prix'=>[1499,2499],'img'=>'monitor'],
            ]
        ],
        'Vêtements' => [
            'produits' => [
                ['nom'=>'Djellaba Homme Traditionnelle','prix'=>[299,899],'img'=>'moroccan-fashion'],
                ['nom'=>'Caftan Femme Brodé','prix'=>[599,1999],'img'=>'caftan'],
                ['nom'=>'Veste en Cuir Homme','prix'=>[799,1499],'img'=>'leather-jacket'],
                ['nom'=>'Robe d\'été Femme','prix'=>[199,499],'img'=>'summer-dress'],
                ['nom'=>'Jean Slim Homme','prix'=>[249,599],'img'=>'jeans'],
                ['nom'=>'Burnous Laine','prix'=>[499,1299],'img'=>'wool-coat'],
                ['nom'=>'T-shirt Coton Homme','prix'=>[79,199],'img'=>'tshirt'],
            ]
        ],
        'Alimentation' => [
            'produits' => [
                ['nom'=>'Huile d\'olive Vierge 1L','prix'=>[59,99],'img'=>'olive-oil'],
                ['nom'=>'Miel de Thym Pur 500g','prix'=>[89,149],'img'=>'honey'],
                ['nom'=>'Argan Alimentaire 250ml','prix'=>[129,199],'img'=>'argan-oil'],
                ['nom'=>'Couscous Baraka 5kg','prix'=>[45,75],'img'=>'couscous'],
                ['nom'=>'Safran du Maroc 5g','prix'=>[79,129],'img'=>'saffron'],
                ['nom'=>'Dattes Medjool 1kg','prix'=>[99,179],'img'=>'dates-fruit'],
                ['nom'=>'Thé Vert Menthe 500g','prix'=>[35,65],'img'=>'green-tea'],
            ]
        ],
        'Maison' => [
            'produits' => [
                ['nom'=>'Tajine en Poterie','prix'=>[199,499],'img'=>'tajine'],
                ['nom'=>'Tapis Berbère 2x3m','prix'=>[799,2499],'img'=>'moroccan-carpet'],
                ['nom'=>'Lanterne Marocaine','prix'=>[149,399],'img'=>'moroccan-lantern'],
                ['nom'=>'Service à Thé Complet','prix'=>[299,699],'img'=>'tea-set'],
                ['nom'=>'Coussin Kilim','prix'=>[129,299],'img'=>'moroccan-cushion'],
                ['nom'=>'Table Basse en Zellige','prix'=>[999,2499],'img'=>'zellige-table'],
            ]
        ],
        'Sport' => [
            'produits' => [
                ['nom'=>'Vélo VTT 26 pouces','prix'=>[1499,3499],'img'=>'mountain-bike'],
                ['nom'=>'Tapis de Sport','prix'=>[199,499],'img'=>'yoga-mat'],
                ['nom'=>'Gants de Boxe','prix'=>[149,399],'img'=>'boxing-gloves'],
                ['nom'=>'Ballon de Football','prix'=>[99,299],'img'=>'football'],
                ['nom'=>'Raquette de Tennis','prix'=>[299,799],'img'=>'tennis-racket'],
                ['nom'=>'Sac de Sport Nike','prix'=>[199,499],'img'=>'sport-bag'],
            ]
        ],
        'Beauté' => [
            'produits' => [
                ['nom'=>'Huile d\'Argan Cosmétique','prix'=>[99,249],'img'=>'argan-cosmetic'],
                ['nom'=>'Savon Beldi Naturel','prix'=>[29,79],'img'=>'black-soap'],
                ['nom'=>'Ghassoul 500g','prix'=>[39,89],'img'=>'ghassoul'],
                ['nom'=>'Crème à la Rose','prix'=>[79,179],'img'=>'rose-cream'],
                ['nom'=>'Parfum Oud Marocain','prix'=>[199,599],'img'=>'oud-perfume'],
                ['nom'=>'Henné Naturel 200g','prix'=>[25,59],'img'=>'henna'],
            ]
        ],
        'Livres' => [
            'produits' => [
                ['nom'=>'Le Coran Tajwid (Arabe)','prix'=>[59,149],'img'=>'quran-book'],
                ['nom'=>'Histoire du Maroc','prix'=>[79,199],'img'=>'history-book'],
                ['nom'=>'Apprendre le Darija','prix'=>[49,99],'img'=>'language-book'],
                ['nom'=>'Cuisine Marocaine Traditionnelle','prix'=>[89,179],'img'=>'cookbook'],
                ['nom'=>'Roman : Les Yeux Baissés','prix'=>[45,89],'img'=>'novel-book'],
            ]
        ],
        'Jouets' => [
            'produits' => [
                ['nom'=>'Lego City 500 pièces','prix'=>[299,599],'img'=>'lego'],
                ['nom'=>'Poupée Traditionnelle','prix'=>[79,199],'img'=>'doll'],
                ['nom'=>'Jeu de Société Famille','prix'=>[149,299],'img'=>'board-game'],
                ['nom'=>'Voiture Télécommandée','prix'=>[199,499],'img'=>'remote-car'],
                ['nom'=>'Puzzle 1000 pièces','prix'=>[99,199],'img'=>'puzzle'],
            ]
        ],
    ];

    public function definition(): array
    {
        $categorieName = $this->faker->randomElement(array_keys($this->catalogue));
        $catalogue     = $this->catalogue[$categorieName];
        $produit       = $this->faker->randomElement($catalogue['produits']);

        [$prixMin, $prixMax] = $produit['prix'];
        $prix = $this->faker->numberBetween($prixMin, $prixMax);

        $imgKeyword = urlencode($produit['img']);
        $imageUrl = "http://localhost:8000/images/produits/{$imgKeyword}.jpg";


        $categorie = Categorie::where('categorie', $categorieName)->first();

        return [
            'nom_prduit'        => $produit['nom'],   
            'description_prduit'=> $this->faker->randomElement([
                "Produit de qualité supérieure, fabriqué au Maroc.",
                "Idéal pour un usage quotidien, livraison rapide.",
                "Produit authentique, satisfaction garantie.",
                "Grande qualité, prix compétitif en DH.",
                "Profitez de ce produit exceptionnel livré partout au Maroc.",
            ]),
            'prix'          => $prix,
            'stock_produit' => $this->faker->numberBetween(5, 150),
            'categorie_id'  => $categorie?->id ?? Categorie::inRandomOrder()->first()->id,
            'image'         => $imageUrl,
        ];
    }
}