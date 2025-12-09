<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name'     => 'Admin',
            'email'    => 'admin@freshmart.com',
            'password' => bcrypt('admin123'),
            'role'     => 'admin',
        ]);

        Product::create([
            'name'        => 'Apples',
            'category'    => 'Fruit',
            'image_url'   => 'https://i.pinimg.com/1200x/66/80/56/668056bf83dce18090f3714c7a28d2aa.jpg',
            'description' => 'Crisp red apples, perfect for snacking.',
            'price'       => 120,
            'stock'       => 50,
        ]);

        Product::create([
            'name'        => 'Bananas',
            'category'    => 'Fruit',
            'image_url'   => 'https://i.pinimg.com/1200x/02/49/5f/02495fb1b8bd32a24fb8eb483a18a074.jpg',
            'description' => 'Sweet ripe bananas.',
            'price'       => 80,
            'stock'       => 60,
        ]);

        Product::create([
            'name'        => 'Carrots',
            'category'    => 'Vegetable',
            'image_url'   => 'https://i.pinimg.com/736x/4a/cc/5f/4acc5f804f89cd17ef7efe9d87c2e37b.jpg',
            'description' => 'Fresh crunchy carrots.',
            'price'       => 60,
            'stock'       => 40,
        ]);

        Product::create([
            'name'        => 'Mango',
            'category'    => 'Fruit',
            'image_url'   => 'https://i.pinimg.com/1200x/a7/9c/dc/a79cdc4d5236dde89f483152b518b1c6.jpg',
            'description' => 'Sweet tropical mangoes.',
            'price'       => 40,
            'stock'       => 60,
        ]);

        Product::create([
            'name'        => 'Durian',
            'category'    => 'Fruit',
            'image_url'   => 'https://i.pinimg.com/1200x/b4/3d/cf/b43dcfd87b86a758582aeeb7553ddee5.jpg',
            'description' => 'King of Fruits, Premium Quality.',
            'price'       => 250,
            'stock'       => 40,
        ]);

        Product::create([
            'name'        => 'Sugar Apple',
            'category'    => 'Fruit',
            'image_url'   => 'https://i.pinimg.com/736x/17/60/6d/17606d1595bc55dc6c059fe66a40ffbe.jpg',
            'description' => 'Sweet sugar apple, locally grown.',
            'price'       => 80,
            'stock'       => 30,
        ]);

        Product::create([
            'name'        => 'Orange',
            'category'    => 'Fruit',
            'image_url'   => 'https://i.pinimg.com/1200x/8d/cf/e2/8dcfe2a785ba01c4b3995ac18005402d.jpg',
            'description' => 'Juicy oranges packed with vitamin C.',
            'price'       => 100,
            'stock'       => 50,
        ]);

        Product::create([
            'name'        => 'Onion',
            'category'    => 'Vegetable',
            'image_url'   => 'https://i.pinimg.com/736x/4d/14/48/4d1448596e0f823d1c9d29dcb0f114a3.jpg',
            'description' => 'Fresh red onions from local farms.',
            'price'       => 60,
            'stock'       => 70,
        ]);

        Product::create([
            'name'        => 'Garlic',
            'category'    => 'Vegetable',
            'image_url'   => 'https://i.pinimg.com/1200x/d7/22/a6/d722a61b8932890e58df925b4b148381.jpg',
            'description' => 'Aromatic garlic bulbs.',
            'price'       => 180,
            'stock'       => 70,
        ]);

        Product::create([
            'name'        => 'Potato',
            'category'    => 'Vegetable',
            'image_url'   => 'https://i.pinimg.com/736x/31/29/2c/31292cbe2d67f5a960e1417dd3aeb637.jpg',
            'description' => 'Versatile potatoes for any dish.',
            'price'       => 55,
            'stock'       => 40,
        ]);

        Product::create([
            'name'        => 'Tomato',
            'category'    => 'Vegetable',
            'image_url'   => 'https://i.pinimg.com/1200x/55/3f/7c/553f7c6e64a3d979343ff49572cd7542.jpg',
            'description' => 'Ripe tomatoes great for salads.',
            'price'       => 20,
            'stock'       => 45,
        ]);

        Product::create([
            'name'        => 'Broccoli',
            'category'    => 'Vegetable',
            'image_url'   => 'https://i.pinimg.com/1200x/e7/c1/ee/e7c1eecf5854ddd0f61ef85fc82ac3c5.jpg',
            'description' => 'Green broccoli packed with nutrients.',
            'price'       => 90,
            'stock'       => 35,
        ]);

    }
}
