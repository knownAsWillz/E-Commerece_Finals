<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;

class AdminDashboardController extends Controller
{
    public function stats()
    {
        $totalRevenue = Order::sum('total_amount'); // sum of all orders
        $totalOrders = Order::count();              // total orders
        $totalProducts = Product::count();          // total products
        $recentOrders = Order::with('items.product', 'user')
            ->orderBy('created_at', 'desc')
            ->take(5)                                // latest 5 orders
            ->get();

        return response()->json([
            'total_revenue' => $totalRevenue,
            'total_products' => $totalProducts,
            'total_orders' => $totalOrders,
            'recent_orders' => $recentOrders,
        ]);
    }
}
