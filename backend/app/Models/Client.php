<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
      protected $fillable=[
        'nom_client',
        'email_client',
        'adresse_client'
    ];
    public function commandes(){
        return $this->HasMany(commandes::class);
    }


}
