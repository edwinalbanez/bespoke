<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
          'name' => [
            'required',
            'max:80',
            'string',
            'alpha:ascii',
          ],
          'description' => [
            'nullable',
            'max:150'
          ]
        ];

        if($this->isMethod('POST')){
          array_push($rules['name'], 'unique:categories');
        }

        return $rules;
    }

    public function messages(): array
    {
      return [
        'name.required' => 'A name is required',
        'name.unique' => 'This category already exists',
        'name.max' => '50 characters maximum',
        'name.string' => 'Must be a string',
        'description.max' => '150 characters maximum'
      ];
    }
}
