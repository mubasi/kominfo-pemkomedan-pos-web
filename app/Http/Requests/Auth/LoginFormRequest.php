<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginFormRequest extends FormRequest
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
        return [
            //
            'email' => ['required', 'email', 'exists:users,email'],
            'password' => ['required', 'min:8'],
        ];
    }

    /**
     * Send Valiation to JsonResponse hanya array "errors[]"
     * --------------------------------------------------
     */
    // protected function failedValidation(Validator $validator) {
    //     throw new HttpResponseException(
    //         response()->json($validator->errors(), 422)
    //     ); 
    // }

    public function attributes()
    {
        return [
            'email'                     => 'Email',
            'password'                  => 'Kata Sandi'
        ];
    }
}
