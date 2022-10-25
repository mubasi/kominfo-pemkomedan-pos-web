<?php

namespace App\Http\Controllers\API\Transaksi;

use App\Http\Controllers\Controller;
use App\Models\Transaksi\DetailTransaksi;
use App\Models\Transaksi\Transaksi;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransaksiController extends Controller
{
    //
    public function store(Request $request)
    {
        $runTransaction = function () use ($request) {
            try {

                $rowItem = new Transaksi();
                $rowItem->nama_pembeli = $request->nama_pelanggan;
                $rowItem->no_hp = $request->no_hp_pelanggan;
                $rowItem->total_modal = $request->total_modal;
                $rowItem->total_harga = $request->total_harga;
                $rowItem->user_with = Auth::user()->id;
                $rowItem->save();


                foreach ($request->transaksi as $item) {
                    $rowTransaksi = new DetailTransaksi();
                    $rowTransaksi->transaksi_id = $rowItem->id;
                    $rowTransaksi->produk_id = $item['id'];
                    $rowTransaksi->qty = $item['qty'];
                    $rowTransaksi->hpp = $item['hpp'];
                    $rowTransaksi->harga = $item['harga'];
                    $rowTransaksi->jumlah_modal = $item['jumlah_modal'];
                    $rowTransaksi->jumlah = $item['jumlah'];
                    $rowTransaksi->save();
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

    public function riwayatTransaksi()
    {
        $posts = Transaksi::select('*')
            ->orderBy(request()->sortby, request()->sortbydesc)
            ->when(request()->q, function ($posts) {
                $posts = $posts->where('kode_transaksi', 'LIKE', '%' . request()->q . '%');
            });

        if (request()->start_date != null && request()->end_date) {
            $from = request()->start_date;
            $to = request()->end_date;
            $posts->whereBetween('created_at', [$from, $to]);
        }

        $rows = $posts->paginate(request()->per_page);
        return response()->json(['status' => 'success', 'data' => $rows]);
    }
}
