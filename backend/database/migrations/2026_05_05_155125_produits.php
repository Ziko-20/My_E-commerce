<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produits',function (Blueprint $table){
                $table->id();

                $table->string('nom_prduit');
                $table->string('description_prduit');
                $table->decimal('prix',8,2);
                $table->integer('stock_produit');
                $table->foreignId('categorie_id')->constrained()->onDelete('cascade');
                $table->timestamps();
        } );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
