<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
 use App\Models\Categorie;
class CategorieController extends Controller
{
    public function index(Request $request){
       $categories=Categorie::all();

/*        return response()->json($categories);

 */      
 /* reutn un peu plus propre */
        return response()->json([
                "success"=>true,
                "data"=>$categories
        ],200);

    }
}
