<?php

namespace App\Http\Requests\Pengguna;

use Illuminate\Foundation\Http\FormRequest;
/**
 * Validator & JsonResponse
 * ==================================================
 */

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class PenggunaFormRequest extends FormRequest
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
        $method = $this->getMethod();

        $rule = [
            'nama'                      => ['required', 'string'],
            'role'                      => ['required', 'exists:roles,id'],
            'aktif'                     => ['required', 'in:Y,N'],
        ];

        if($data['id'] == null) {
            $rule +=[
                'email'                     => [
                    'required', 'email', 'unique:users,email'
                ],
                'password'                  => ['required', 'min:8'],
                're_password'            => ['required', 'same:password'],
            ];
        } else {
            $rule +=[
                'email'                     => [
                    'required', 'email', Rule::unique('users', 'email')->ignore($data['id']), 
                ],
                'password'                  => ['nullable', 'min:8'],
                're_password'            => ['nullable', 'same:password'],
            ];
        }

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
            'name'                      => 'Nama',
            'email'                     => 'Alamat Email',
            'password'                  => 'Kata Sandi',
            're_password'            => 'Ulangi Kata Sandi',
            'role'                      => 'Hak Akses',
            'aktif'                     => 'Aktif'
        ];
    }
}
