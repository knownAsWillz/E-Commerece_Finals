<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class AdminProductController extends Controller
{
    // GET /admin/products
    public function index()
    {
        try {
            $products = Product::all();
            return response()->json($products);
        } catch (\Exception $e) {
            Log::error('Error fetching products: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to fetch products.'], 500);
        }
    }

    // POST /admin/products
    public function store(Request $request)
    {
        // Validate all fields
        $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|string', // accept any string URL
        ]);

        try {
            $product = Product::create([
                'name'        => $request->name,
                'category'    => $request->category,
                'price'       => $request->price,
                'stock'       => $request->stock,
                'description' => $request->description,
                'image_url'   => $request->image_url,
            ]);

            return response()->json($product, 201);
        } catch (\Exception $e) {
            Log::error('Error creating product: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create product.'], 500);
        }
    }

    // PUT /admin/products/{id}
    public function update(Request $request, $id)
    {
        $request->validate([
            'name'        => 'required|string|max:255',
            'category'    => 'required|string|max:255',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|string',
        ]);

        try {
            $product = Product::findOrFail($id);
            $product->update([
                'name'        => $request->name,
                'category'    => $request->category,
                'price'       => $request->price,
                'stock'       => $request->stock,
                'description' => $request->description,
                'image_url'   => $request->image_url,
            ]);

            return response()->json($product);
        } catch (\Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update product.'], 500);
        }
    }

    // DELETE /admin/products/{id}
    public function destroy($id)
    {
        try {
            $product = Product::findOrFail($id);

            // Prevent deletion if the product was ordered
            if ($product->orderItems()->exists()) {
                return response()->json([
                    'error' => 'Cannot delete product because it has been ordered.'
                ], 400);
            }

            $product->delete();
            return response()->json(['message' => 'Product deleted successfully.']);
        } catch (\Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete product.'], 500);
        }
    }
}
