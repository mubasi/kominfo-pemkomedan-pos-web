<?php

namespace App\Http\Controllers\API\Produk;

use App\Http\Controllers\Controller;
use App\Models\Produk\Produk;
use Illuminate\Http\Request;

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
    public function store(Request $request)
    {
        //
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
