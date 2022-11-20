<?php

namespace App\Http\Controllers\API\Produk;

use App\Http\Controllers\Controller;
use App\Http\Requests\Produk\ProdukFormRequest as FormRequest;
use App\Models\Produk\Produk;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $posts = Produk::select('*')
            ->orderBy(request()->sortby, request()->sortbydesc)
            ->when(request()->q, function ($posts) {
                $posts = $posts->where('nama', 'LIKE', '%' . request()->q . '%');
            })
            ->with('gambar_produk', 'kategori_produk_relasi');

        if(request()->kategori) {
            $posts->whereHas('kategori_produk_relasi', function($q){
                $q->where('kategori_produk_id', request()->kategori);
            });
        }

        if (request()->aktif) {
            $posts->where('aktif', request()->aktif);
        }

        $rows = $posts->paginate(request()->per_page);
        return response()->json(['status' => 'success', 'data' => $rows, 'url' => url('storage')], 200);
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
                    $rowItem = new Produk();
                } else {
                    $rowItem = Produk::findOrFail($request->id);
                }

                $rowItem->nama = $request->nama;
                $rowItem->harga = $request->harga;
                $rowItem->hpp = $request->hpp;
                $rowItem->deskripsi = $request->deskripsi;
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
        $data = Produk::with('gambar_produk', 'kategori_produk_relasi')
            ->findOrFail($id);
        $statusCode = JsonResponse::HTTP_OK;
        $status = [
            'statusCode' => $statusCode . " OK",
            'status'    => true,
            'code'      => 0,
            'message'   => 'show data',
            'url'       => url('storage')
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
        $rowItem = Produk::where('id', $id);
        $rowItem->delete();

        
        return response()->json(['status' =>  true, 'data' => $rowItem]);
    }
}
