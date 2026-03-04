<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Comment;
use App\Models\Article;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        return [
            'article_id' => Article::factory(), // будет переопределён в сидере
            'author_name' => $this->faker->name,
            'content' => $this->faker->paragraph,
        ];
    }
}
