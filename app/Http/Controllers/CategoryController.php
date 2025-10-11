<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = $request->input('filter', '');

        return Inertia::render('categories/index', [
          'categories' => Inertia::scroll(fn () => 
            Category::where('name', 'like', '%'.$filter.'%')
              ->paginate(30)
          )
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
      try {
        Category::create($request->validated());
        return redirect()
          ->back()
          ->with('success', 'Category created');

      } catch (\Throwable $th) {
        error_log('Error creating category: ' . $th->getMessage());
        return redirect()
          ->back()
          ->with('error', 'An error occurred while creating the category.');
      }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
      try {
        $category = Category::findOrFail($id);
        return Inertia::render('categories/edit', [
          'category' => $category
        ]);
      } catch (\Throwable $th) {
        error_log('Error loading category: ' . $th->getMessage());
        return redirect()
          ->back()
          ->with('error', 'Information not available');
      }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCategoryRequest $request, string $id)
    {
      try {
        $category = Category::findOrFail($id);
        $validated = $request->validated();
        $category->update($validated);

        return redirect()
          ->route('categories.index')
          ->with('success', 'Category updated');

      } catch (\Throwable $th) {
        error_log('Error loading category: ' . $th->getMessage());
        return redirect()
          ->back()
          ->with('error', 'An error occurred while updating');
      }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
          $category = Category::findOrFail($id);
          $category->delete();
          return redirect()
            ->back()
            ->with('success', 'Category removed');
          
        } catch (\Throwable $th) {
          return redirect()
            ->back()
            ->with('error', 'An error occurred while deleting');
        }
    }
}
