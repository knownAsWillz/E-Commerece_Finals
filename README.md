# E-Commerce Platform (Laravel + React) plus Task Demo (Docker)

This repo now contains two stacks:
- **E-Commerce app:** `backend/` (Laravel API with Sanctum auth/roles) + `frontend/` (React 18 SPA).
- **Task demo (Dockerized):** `docker-php83/` (Laravel 12 task API) + `docker-react/` (React task UI).

Below documents both. Use the e-commerce stack for the main app; the docker-* stack remains as a standalone task example.

## E-Commerce Backend (`backend/`)
**Tech:** Laravel 12, PHP 8+, Sanctum tokens, MySQL  
**Base URL:** `http://127.0.0.1:8000/api` (see `frontend/src/api/axiosClient.js`)

### Auth
- `POST /register` – name, email, password -> creates customer and returns token.
- `POST /login` – returns user + token.
- `GET /me` – current user (auth required).
- `POST /logout` – revoke current token.
- Tokens issued via Sanctum; `Authorization: Bearer <token>` is added by axios interceptor.

### Products
- `GET /products` – list products; supports `category` (case-insensitive, e.g., `fruit`, `fruits`) and `search` (name contains).
- `GET /products/{id}` – product detail.

### Orders (auth: customer)
- `POST /orders` – checkout with `customer_name`, `address`, `contact`, `items[]` of `{ product_id, quantity }`.  
  - Validates stock, decrements inventory, stores line-item price snapshots, returns order with items.

### Admin-only (role `admin`)
- Orders: `GET /admin/orders` (all with items/user), `PUT /admin/orders/{id}/status` (pending | processing | shipped | delivered).
- Products: `GET /admin/products`, `POST /admin/products`, `PUT /admin/products/{id}`, `DELETE /admin/products/{id}` (blocks delete if ordered).
- Dashboard: `GET /admin/dashboard` (totals + 5 recent orders).

### Data Model
- `products` (`name`, `category`, `price`, `stock`, `description`, `image_url:text`, timestamps).
- `orders` (`user_id`, `customer_name`, `address`, `contact`, `total_amount`, `status`).
- `order_items` (`order_id`, `product_id`, `quantity`, `price` snapshot).
- `users` includes `role` (default `customer`); admin middleware checks `role === 'admin'`.
- Personal access tokens extended with `expires_at` column.

### Key Files
- Routes: `backend/routes/api.php`
- Controllers: `backend/app/Http/Controllers/Api/*Controller.php`
- Middleware: `backend/app/Http/Middleware/AdminMiddleware.php`
- Models: `backend/app/Models/{Product,Order,OrderItem,User}.php`
- Migrations: `backend/database/migrations/*products*`, `*orders*`, `*order_items*`, `*add_role_to_users*`, `*personal_access_tokens*`

### Running (typical local Laravel)
```sh
cd backend
composer install
cp .env.example .env   # set DB creds
php artisan key:generate
php artisan migrate
php artisan serve       # starts on http://127.0.0.1:8000
```
Ensure MySQL is available and credentials match `.env`. Sanctum defaults are assumed.

## E-Commerce Frontend (`frontend/`)
**Tech:** React 18, React Router 6, Bootstrap  
**API base:** `http://127.0.0.1:8000/api` (edit `frontend/src/api/axiosClient.js` if backend URL changes)

### Features & Routing
- Public: `HomePage` (`/`), auth pages (`/login`, `/register`).
- Customer-only: product browse (`/products`, `/products/:id`), cart (`/cart`), checkout (`/checkout`).
- Admin-only: dashboard (`/admin/dashboard`), manage products (`/admin/products`), orders (`/admin/orders`).
- Navbar reflects role; logout calls `/logout` then clears local storage.

### State & Context
- Auth: `AuthContext` stores `user` + token in `localStorage`; login/register flows call backend endpoints and set both.
- Cart: `CartContext` manages cart items with qty capping by stock; exposes add/remove/update/clear and total.

### Key Files
- Entry/routing: `frontend/src/App.js`, `frontend/src/index.js`
- API client: `frontend/src/api/axiosClient.js`
- Context: `frontend/src/context/{AuthContext,CartContext,ProtectedRoute}.js`
- Pages: `frontend/src/pages/*.js` (shop, cart/checkout, admin dashboards)
- UI: `frontend/src/components/Navbar.js`, `ProductCard.js`

### Run
```sh
cd frontend
npm install
npm start   # http://localhost:3000
```
Backend must be running and reachable at the base URL above.

## Task Demo (Dockerized)
Still available for reference/testing.
- Backend: `docker-php83/` (Laravel 12, PHP 8.3, MySQL). API base `http://localhost:8082/api`.
  - CRUD `/tasks` with fields: `title`, `description`, `status` (`pending|in_progress|completed`), optional `due_date`.
  - Docker services: API `8082`, phpMyAdmin `8081`, MySQL host `3307`.
- Frontend: `docker-react/` (React 18 SPA). Dev `3000`, prod `8080`.

Quick start (task demo):
```sh
cd docker-php83 && docker compose up -d
# inside container: composer install && cp .env.example .env && php artisan key:generate && php artisan migrate --seed
cd ../docker-react && docker compose up   # dev UI at http://localhost:3000
```

## Notes & Tips
- Update `axiosClient` base URL if backend host/port changes.
- Admin access depends on `users.role = 'admin'`; seed or update a user accordingly.
- Product deletion is blocked if it has order items.
- Orders decrement stock; ensure stock is populated before checkout flows.
