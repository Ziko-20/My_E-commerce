<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request){

        $validated=$request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|string|unique:users',
            'telephone'=>'required|string|unique:users',
            'adresse'=>'required|string',
            'password'=>'required|string|min:6|confirmed',

        ]);

        $user= User::create($validated);
        $token=$user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);

    }

    public function login(Request $request)
    {
        $request->validate([
            'email'  => 'required|email', 
            'password' => 'required|string', 

        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        $user  = Auth::user();

        $token = $user->createToken('auth_token')->plainTextToken; 

        return response()->json([
            'user'=> $user,
            'token'=> $token,
        ]);
    }
   

    public function logout(Request $request){
    
         $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    public function me(Request $request){
    
        return response()->json($request->user());
    }

}
