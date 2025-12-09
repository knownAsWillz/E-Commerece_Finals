<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminDashboardController;
use App\Http\Controllers\Api\AdminProductController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;

Route::withoutMiddleware([
    \Illuminate\Session\Middleware\StartSession::class,
    \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
    \Illuminate\Cookie\Middleware\EncryptCookies::class,
])->group(function () {

    // ---- PUBLIC ----
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);

    // ---- AUTH ----
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/orders', [OrderController::class, 'store']);

        Route::middleware('admin')->group(function () {
            Route::get('/admin/dashboard', [AdminDashboardController::class, 'stats']);
            Route::get('/admin/orders', [OrderController::class, 'index']);
            Route::put('/admin/orders/{id}/status', [OrderController::class, 'updateStatus']);

            Route::get('/admin/products', [AdminProductController::class, 'index']);
            Route::post('/admin/products', [AdminProductController::class, 'store']);
            Route::put('/admin/products/{id}', [AdminProductController::class, 'update']);
            Route::delete('/admin/products/{id}', [AdminProductController::class, 'destroy']);
        });
    });

});