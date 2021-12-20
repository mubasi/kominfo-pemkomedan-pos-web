<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginFormRequest as FormRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    //

    public function index(FormRequest $request)
    {
        $runTransaction = function () use ($request) {
            try {
                $credentials = $request->only('email', 'password');

                if (Auth::attempt($credentials)) {
                    //generate session
                    $request->session()->regenerate();
                    // Data ...
                    $user_id = Auth::user()->id;

                    $rowUser = User::where('id', $user_id)
                        ->with('hashRole')
                        ->first();

                    // Status Error ...
                    $error  = false;
                    $statusCode = JsonResponse::HTTP_OK;
                    $status = [
                        'code'      => $statusCode,
                        'name'      => 'OK',
                        'message'   => 'Login Successfully',
                        'data' => $rowUser,
                    ];
                } else {
                    // Status Error ...
                    $error      = true;
                    $statusCode = JsonResponse::HTTP_UNAUTHORIZED;
                    $status     = [
                        'code'      => $statusCode,
                        'name'      => 'Unauthorized',
                        'message'   => 'Email atau kata sandi salah. Silahkan coba lagi.'
                    ];
                }

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                return response()->json([
                    'error' => false,
                    'status' => $status,
                ], $statusCode);

            } catch (Exception $e) {
                // Log::error($e->getMessage(), [
                //     '_trace' => $e->getTraceAsString()
                // ]);
                // ---
                $statusCode = 500; //$e->getCode();
                $status = [
                    'code'      => $statusCode,
                    'name'      => '',
                    'message'   => $e->getMessage()
                ];
                return response()->json([
                    'error' => true,
                    'status' => $status
                ], $statusCode);
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }

    public function profile()
    {
        return response()->json(Auth::user(), 200);
    }

    public function logout()
    {
        Auth::guard('web')->logout();
        return response([
            'status' => true,
        ], 200);
    }
}
