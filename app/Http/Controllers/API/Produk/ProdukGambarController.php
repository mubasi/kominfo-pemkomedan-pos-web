<?php

namespace App\Http\Controllers\API\Produk;

use App\Http\Controllers\Controller;
use App\Http\Requests\Produk\ProdukGambarFormRequest;
use App\Models\Produk\ProdukGambar;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProdukGambarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        abort(404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProdukGambarFormRequest $request)
    {
        //

        $runTransaction = function () use ($request) {
            try {
                foreach ($request->gambar as $item) {

                    // if ($request->id != null) {
                    //     $rowItem = GambarProduk::findOrFail($request->id);
                    //     if ($request->hasFile('image')) {
                    //         $path = $item->store('product');
                    //         $rowItem->path = $path;
                    //     }
                    // } else {
                    $rowItem = new ProdukGambar();
                    $path = $item->store('produk');
                    $rowItem->path = $path;
                    // }

                    $rowItem->produk_id = $request->produk_id;
                    $rowItem->save();
                }

                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'code'      => $statusCode,
                    'name'      => 'OK',
                    'message'   => 'Gambar Produk Save Successfully',
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    }
}
