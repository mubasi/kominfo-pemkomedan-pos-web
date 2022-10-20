<?php

use App\Http\Controllers\API\Pengguna\PenggunaController;
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

Route::middleware('auth:sanctum')->group(
    [
        'namescape' => 'API',
    ],
    function () {
        /**
         * profile
         */
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::apiResource('/pengguna', PenggunaController::class);
    }
);

// Route::post('login', AuthController::class, 'index');
