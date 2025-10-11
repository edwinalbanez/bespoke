<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
  protected $model = Category::class;
  
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
          'name' => fake()->words(2, true),
          'description' => fake()->sentence()
        ];
    }

    public function withoutDescription(): Factory
    {
      return $this->state(fn (array $attributes) => [
        'description' => null
      ]);
    }

  /**
   * Common predefined categories
   */

  public function technology(): Factory
  {
    return $this->state(function (array $attributes) {
      return [
        'name' => 'Technology',
        'description' => 'Everything related to technology, gadgets, and innovation',
      ];
    });
  }

  public function sports(): Factory
  {
    return $this->state(function (array $attributes) {
      return [
        'name' => 'Sports',
        'description' => 'All sports-related content and activities',
      ];
    });
  }

  public function entertainment(): Factory
  {
    return $this->state(function (array $attributes) {
      return [
        'name' => 'Entertainment',
        'description' => 'Movies, music, TV shows, and entertainment news',
      ];
    });
  }

  public function education(): Factory
  {
    return $this->state(function (array $attributes) {
      return [
        'name' => 'Education',
        'description' => 'Learning resources, courses, and educational content',
      ];
    });
  }

  public function health(): Factory
  {
    return $this->state(function (array $attributes) {
      return [
        'name' => 'Health & Wellness',
        'description' => 'Health tips, fitness, and wellness information',
      ];
    });
  }
}
