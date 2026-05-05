<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Categorie;
use App\Models\LigneCommande;
use App\Models\Wishlist;

class Produit extends Model
{
    protected $fillable=["nom_prduit",
"description_prduit",
"prix",
"stock_produit"];

    public function categorie() {
    return $this->belongsTo(Categorie::class);
}

    public function ligne_commande(){
        return $this->hasMany(LigneCommande::class);
    }
    public function wishlists() {
    return $this->hasMany(Wishlist::class);
}

   

}
