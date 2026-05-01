<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    protected $fillable=[
        'nom_prduit',
        'description_prduit',
        'prix',
        'stock_produit'
    ];
   
}
