<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      Category::factory()->technology()->create();
      Category::factory()->sports()->create();
      Category::factory()->entertainment()->create();
      Category::factory()->education()->create();
      Category::factory()->health()->create();

      Category::factory()->count(50)->create();

      Category::factory()
        ->count(50)
        ->withoutDescription()
        ->create();

    }
}
