<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\LombaController;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/bookings', [BookingController::class, 'store']);
Route::get('/bookings/check/{nama}', [BookingController::class, 'checkStatus']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/admin/dashboard', [BookingController::class, 'index']);
    Route::get('/admin/bookings', [BookingController::class, 'index']);
    Route::put('/admin/bookings/{id}/verify', [BookingController::class, 'verifyBooking']);
    Route::get('/admin/reports', [BookingController::class, 'report']);

    Route::get('/admin/settings', [SettingController::class, 'index']);
    Route::put('/admin/settings', [SettingController::class, 'update']);

    // AREA JADWAL LOMBA
    Route::get('/admin/lombas', [LombaController::class, 'index']);
    Route::post('/admin/lombas', [LombaController::class, 'store']);
    Route::get('/admin/lombas/{id}', [LombaController::class, 'show']);
});