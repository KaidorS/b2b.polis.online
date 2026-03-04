<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(['message' => 'Laravel API is working']);
});

Route::apiResource('articles', ArticleController::class)->only(['index', 'show', 'store']);
Route::post('articles/{article}/comments', [ArticleController::class, 'addComment']);
