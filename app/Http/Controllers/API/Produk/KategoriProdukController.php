<?php

namespace App\Http\Controllers\API\Produk;

use App\Http\Controllers\Controller;
use App\Http\Requests\Produk\KategoriProdukFormRequest as FormRequest;
use App\Models\Produk\KategoriProduk;
use App\Models\Produk\KategoriProdukRelasi;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class KategoriProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $posts = KategoriProduk::select('*')
            ->orderBy(request()->sortby, request()->sortbydesc)
            ->when(request()->q, function ($posts) {
                $posts = $posts->where('nama', 'LIKE', '%' . request()->q . '%');
            });

        if (request()->aktif) {
            $posts->where('aktif', request()->aktif);
        }

        $rows = $posts->paginate(request()->per_page);
        return response()->json(['status' => 'success', 'data' => $rows, 'url' => url('')], 200);
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
                    $rowItem = new KategoriProduk();
                } else {
                    $rowItem = KategoriProduk::findOrFail($request->id);
                }

                $rowItem->nama = $request->nama;
                $rowItem->aktif = $request->aktif;
                $rowItem->save();

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
        $data = KategoriProduk::findOrFail($id);
        $statusCode = JsonResponse::HTTP_OK;
        $status = [
            'statusCode' => $statusCode . " OK",
            'status'    => true,
            'code'      => 0,
            'message'   => 'show data'
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
                $rowItem = KategoriProduk::findOrfail($id);
                $rowItem->delete();
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

    public function getoption()
    {
        $data = KategoriProduk::get();
        $statusCode = JsonResponse::HTTP_OK;
        $status = [
            'statusCode' => $statusCode . " OK",
            'status'    => true,
            'code'      => 0,
        ];
        return response()->json(['status' =>  $status, 'data' => $data]);
    }

    public function saveproduk(Request $request)
    {
        # code...
        $runTransaction = function () use ($request) {

            $tempKategoriRelasi = KategoriProdukRelasi::where('produk_id', $request->id_produk);

            if($tempKategoriRelasi->exists()) {
                $tempKategoriRelasi->delete();
            }

            try {
                foreach ($request->kategori as $item) {
                    $rowItem = new KategoriProdukRelasi();
                    $rowItem->kategori_produk_id = $item['id'];
                    $rowItem->produk_id = $request->id_produk;
                    $rowItem->save();
                }

                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'code'      => $statusCode,
                    'name'      => 'OK',
                    'message'   => 'Save Successfully',
                ];

                /**
                 * Return Hasil
                 * --------------------------------------------------
                 */
                return response()->json([
                    'error' => false,
                    'status' => $status,
                    // 'data' => $rowItem,
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
}
