<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Comment;

class ArticlesAndCommentsSeeder extends Seeder
{
    public function run(): void
    {
        // Создаём 5 статей
        Article::factory(5)->create()->each(function ($article) {
            // К каждой статье создаём 3 комментария
            Comment::factory(3)->create(['article_id' => $article->id]);
        });
    }
}
