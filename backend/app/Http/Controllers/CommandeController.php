<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;

class CommandeController extends Controller
{
    public function index(Request $request){

        if(!$request->user()){
            return response()->json(
            [
                "succes"=>false,
                "message"=>"vous devais etres connecter"
            ],401);

        
       }$commande=Commande::where('user_id','=',$request->user()->id)->get();
       return response()->json([
        "succes"=>true,
        "data"=>$commande
       ],200);
    }

    public function store(Request $request){

        $request->validate([
        
        "date_commande" => "required|date",
        "total" => "required|numeric",
        "statut" => "required|in:en_attente,expediee,livree"]);
        

        $commande=Commande::create([
            "user_id" => $request->user()->id,
            "date_commande" => now(),
            "total" => $request->total,
            "statut" => $request->statut
        ]);

        return response()->json([
            "succes"=>true,
            "message"=>"Commande ajouter avec succes",
            "data" => $commande
        ],201);
    }


    /**/ 
    public function show(Request $request , $id){

       $commande= Commande::where('id', $id)->where('user_id',auth()->id())->first();
      
if(!$commande){
    return response()->json([
            "success"=>false,
            "message"=>"Commande est introuvable",
        ],404);
}
        return response()->json([
            "success"=>true,
            "message"=>"Commande s affiche avec succes",
            "data" => $commande
        ],200);
    }
}





/*  $commande=Commande::all();
            return response()->json([
                "succes"=>true,
                "data"=>$commande
            ]);
        */