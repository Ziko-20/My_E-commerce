<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $wishlist = Wishlist::where('user_id', $request->user()->id)
            ->with('produit')
            ->get();

        return response()->json($wishlist);
    }

    public function store(Request $request)
    {
        $request->validate([
            'produit_id' => 'required|exists:produits,id',
        ]);

        $wishlist = Wishlist::firstOrCreate([
            'user_id'    => $request->user()->id,
            'produit_id' => $request->produit_id,
        ]);

        return response()->json(['message' => 'Produit ajouté à la wishlist'], 201);
    }

    public function destroy(Request $request, $id)
    {
        Wishlist::where('user_id', $request->user()->id)
            ->where('id', $id)
            ->delete();

        return response()->json(['message' => 'Produit retiré de la wishlist']);
    }
}