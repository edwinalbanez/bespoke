<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Number;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('categories/index', [
          'categories' => Category::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
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
          ->with('success', 'Category created successfully');

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
          ->with('success', 'Category updated successfully');

      } catch (\Throwable $th) {
        error_log('Error loading category: ' . $th->getMessage());
        return redirect()
          ->back()
          ->with('error', 'An error occurred while updating the category.');
      }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
