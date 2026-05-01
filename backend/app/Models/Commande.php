<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable=[
        'id_commande',
        'id_client',
        'date_commande',
        'total'
    ];
    public function Client(){
        return $this->BelongsTo(Client::class);
    }
    
}



