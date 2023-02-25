<?php

use App\Http\Controllers\API\Pengguna\PenggunaController;
use App\Http\Controllers\API\Produk\KategoriProdukController;
use App\Http\Controllers\API\Produk\ProdukController;
use App\Http\Controllers\API\Produk\ProdukGambarController;
use App\Http\Controllers\API\Transaksi\TransaksiController;
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
        /**
         * gambar produk
         */
         Route::apiResource('/gambar-produk', ProdukGambarController::class);
         /**
          * kategori produk
          */
        Route::post('/kategori-produk/save-produk', [KategoriProdukController::class, 'saveproduk']);

        /**
         * kategori produk
         */
        Route::get('/kategori-produk/getoption', [KategoriProdukController::class, 'getoption']);
        Route::apiResource('/kategori-produk', KategoriProdukController::class);

        /**
         * transaksi
         */
        Route::post('/transaksi', [TransaksiController::class, 'store']);
        Route::get('/transaksi/stuck/sendmail/{id}', [TransaksiController::class, 'sendEmail']);
        Route::get('/transaksi/stuck/print/{id}', [TransaksiController::class, 'printStuck']);
        Route::get('/riwayat-transaksi', [TransaksiController::class, 'riwayatTransaksi']);
    }
);

// Route::post('login', AuthController::class, 'index');
