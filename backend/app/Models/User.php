<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Commande;
use App\Models\Wishlist;

#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{

    protected $fillable = ['name', 'email', 'telephone', 'adresse', 'password', 'role']; 



    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable,HasApiTokens;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function commandes(){
        return $this->hasMany(Commande::class);
    }
   /*  public function produits(){
        return $this->hasMany(Produit::class);
    } */

        public function wishlists() {
    return $this->hasMany(Wishlist::class);
}

}
