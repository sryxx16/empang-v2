<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/bookings', [BookingController::class, 'store']);
Route::get('/bookings/check/{nama}', [BookingController::class, 'checkStatus']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Nanti kita tambah route untuk ambil semua data booking di sini
    // Route::get('/admin/bookings', [BookingController::class, 'index']);
});
