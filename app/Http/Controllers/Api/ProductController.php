<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category'); // all / vegetable / fruit
        $search   = $request->query('search');

        $query = Product::query();

        // Case-insensitive category filter, works for singular/plural too
        if ($category && strtolower($category) !== 'all') {
            $categoryPattern = strtolower($category) . '%'; // matches "fruit", "fruits", etc.
            $query->whereRaw('LOWER(category) LIKE ?', [$categoryPattern]);
        }

        // Case-insensitive search by name
        if ($search) {
            $query->whereRaw('LOWER(name) LIKE ?', ['%' . strtolower($search) . '%']);
        }

        return $query->orderBy('name')->get();
    }

    public function show($id)
    {
        return Product::findOrFail($id);
    }
}
