<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'name'      => 'sometimes|string|max:255',
            'telephone' => 'sometimes|string|unique:users,telephone,' . $request->user()->id,
            'adresse'   => 'sometimes|string',
            'password'  => 'sometimes|string|min:6|confirmed',
        ]);

        $request->user()->update($request->only('name', 'telephone', 'adresse', 'password'));

        return response()->json(['message' => 'Profil mis à jour', 'user' => $request->user()]);
    }
}