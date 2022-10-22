<?php

namespace App\Http\Requests\Produk;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validator & JsonResponse
 * ==================================================
 */

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class ProdukGambarFormRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $data = $this->request->all();
        // $method = $this->getMethod();
        $rule = [
            'gambar'                      => ['nullable', 'array', 'min:1'],
            'produk_id'                   => ['required', 'exists:produk,id']
        ];

        // if($data['id'] == null) {
        //     $rule +=[
        //         'images'                      => ['required', 'array', 'min:1'],
        //     ];
        // } else {
        //     $rule +=[
        //         'images'                      => ['nullable', 'array', 'min:1'],
        //     ];
        // }

        return $rule;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json($validator->errors(), 422)
        );
    }

    public function messages()
    {
        return [
            // 'required' => 'The :attribute Field Is Required.',
        ];
    }

    public function attributes()
    {
        return [
            'gambar'              => 'Gambar Produk',
            'produk_id'            => 'Id Produk',
        ];
    }
}
