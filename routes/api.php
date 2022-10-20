<?php

use App\Http\Controllers\API\Pengguna\PenggunaController;
use App\Http\Controllers\API\Produk\ProdukController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/authentication', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'index']);

Route::group(
    [
        'namescape' => 'API',
        'middleware' => 'auth:sanctum',
    ],
    function () {
        /**
         * profile
         */
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::get('/logout', [AuthController::class, 'logout']);
        Route::get('/pengguna/role/getoption', [PenggunaController::class, 'roles']);
        Route::apiResource('/pengguna', PenggunaController::class);

        /**
         * produk
         */
        Route::apiResource('/produk', ProdukController::class);
    }
);

// Route::post('login', AuthController::class, 'index');
