<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // Admin: list all orders
    public function index()
    {
        return Order::with('items.product', 'user')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    // User: create order (checkout)
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required',
            'address'       => 'required',
            'contact'       => 'required',
            'items'         => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
        ]);

        return DB::transaction(function () use ($request) {
            $total = 0;
            $itemsData = [];

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    abort(422, "Insufficient stock for {$product->name}");
                }

                $line = $product->price * $item['quantity'];
                $total += $line;

                $itemsData[] = [
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'price'      => $product->price,
                ];

                $product->decrement('stock', $item['quantity']);
            }

            $order = Order::create([
                'user_id'       => $request->user()->id,
                'customer_name' => $request->customer_name,
                'address'       => $request->address,
                'contact'       => $request->contact,
                'total_amount'  => $total,
                'status'        => 'pending',
            ]);

            foreach ($itemsData as $data) {
                $data['order_id'] = $order->id;
                OrderItem::create($data);
            }

            return $order->load('items.product');
        });
    }

    // Admin: update order status
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered',
        ]);

        $order = Order::findOrFail($id);
        $order->status = $request->status;
        $order->save();

        return $order;
    }
}
