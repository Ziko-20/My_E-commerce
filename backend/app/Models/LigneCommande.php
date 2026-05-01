<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LigneCommande extends Model
{
    protected $fillable=[
        'id_commande',
        'id_produit',
        'quantite',
        'sous_total'
    ];
    public function Commandes(){
        return $this->HasMany(Commandes::class);
    }
}
