<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Change image_url to TEXT so it can store long URLs
            $table->text('image_url')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Revert back to VARCHAR(255)
            $table->string('image_url', 255)->nullable()->change();
        });
    }
};
