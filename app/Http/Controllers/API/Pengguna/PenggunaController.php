<?php

namespace App\Http\Controllers\API\Pengguna;

use App\Http\Controllers\Controller;
use App\Http\Requests\Pengguna\PenggunaFormRequest as FormRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class PenggunaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $posts = User::select('*')
            ->orderBy(request()->sortby, request()->sortbydesc)
            ->when(request()->q, function ($posts) {
                $posts = $posts->where('name', 'LIKE', '%' . request()->q . '%');
            })
            ->with('roles');

        if (request()->aktif) {
            $posts->where('active', request()->aktif);
        }

        $rows = $posts->paginate(request()->per_page);
        return response()->json(['status' => 'success', 'data' => $rows]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(FormRequest $request)
    {
        //

        $runTransaction = function () use ($request) {
            try {
                if ($request->id == null) {
                    $rowItem = new User();
                } else {
                    $rowItem = User::findOrFail($request->id);
                }

                $rowItem->name = $request->nama;
                $rowItem->email = $request->email;
                $rowItem->active = $request->aktif;
                if ($request->password != null) {
                    $rowItem->password = Hash::make($request->password);
                }
                $rowItem->save();

                if ($request->id == null) {
                    $rowItem->assignRole($request->role);
                } else {
                    $rowItem->syncRoles($request->role);
                }

                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'code'      => $statusCode,
                    'name'      => 'OK',
                    'message'   => 'Data Save Successfully',
                ];

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                return response()->json([
                    'data' => $rowItem,
                    'error' => false,
                    'status' => $status,
                ], $statusCode);
            } catch (Exception $e) {
                // $statusCode = $e->getCode();
                $status = [
                    'code'      => 500, //$e->getCode(),
                    'name'      => '',
                    'message'   => $e->getMessage()
                ];
                return response()->json([
                    'error' => true,
                    'status' => $status
                ], 500);
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $data = User::with('roles')
            ->findOrFail($id);
        $statusCode = JsonResponse::HTTP_OK;
        $status = [
            'statusCode' => $statusCode . " OK",
            'status'    => true,
            'code'      => 0,
            'message'   => 'show user'
        ];
        return response()->json(['status' =>  $status, 'data' => $data]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        abort(404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $runTransaction = function () use ($id) {
            try {
                /**
                 * Table ERD tidak perlu dihapus
                 * Jika menggunakan SoflDeletes
                 * --------------------------------------------------
                 */

                /**
                 * Query 01
                 * --------------------------------------------------
                 * SoftDeletes tabel induk
                 */
                $rowItem = User::findOrfail($id);
                $rowItem->delete();

                // /**
                //  * Query 01
                //  * --------------------------------------------------
                //  * SoftDeletes tabel ERD (hasMany)
                //  */
                // $rowItemWakil = Npwrd::where('npwrd_id', $id);
                // $rowItemWakil->delete();

                // /**
                //  * Query 02
                //  * --------------------------------------------------
                //  * SoftDeletes tabel ERD (hasMany)
                //  */
                // $rowItemWakil = User::where('pegawai_id', $id);
                // $rowItemWakil->delete();

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'statusCode' => $statusCode . " Deleted",
                    'status'    => 'success',
                    'code'      => 0,
                    'message'   => 'delete opd'
                ];
                return response()->json(['status' =>  $status, 'data' => $rowItem]);
            } catch (Exception $e) {
                return response()->json(
                    [
                        'error' => 'Unable to delete',
                        // 'msg' => $e->getMessage()
                    ],
                    400
                );
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }

    public function roles()
    {
        $data = Role::get();
        $statusCode = JsonResponse::HTTP_OK;
        $status = [
            'statusCode' => $statusCode . " OK",
            'status'    => true,
            'code'      => 0,
            'message'   => 'Role'
        ];
        return response()->json(['status' =>  $status, 'data' => $data]);
    }
}
