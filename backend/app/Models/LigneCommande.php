<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Commande;
use App\Models\Produit; 

class LigneCommande extends Model
{
    protected $fillable = ['produit_id', 'commandes_id', 'quantite', 'sous_total'];

    

   public function commande() {
    return $this->belongsTo(Commande::class, 'commandes_id');
}
    public function produit() {
    return $this->belongsTo(Produit::class);
}


}
