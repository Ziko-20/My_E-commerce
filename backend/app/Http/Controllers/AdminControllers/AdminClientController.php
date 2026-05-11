<?php

namespace App\Http\Controllers;

use App\Models\User;

class AdminClientController extends Controller
{
    public function index()
    {
        $clients = User::where('role', 'client')->get();
        return response()->json($clients);
    }

    public function destroy($id)
    {
        $client = User::findOrFail($id);
        $client->delete();
        return response()->json(['message' => 'Client supprimé']);
    }
}