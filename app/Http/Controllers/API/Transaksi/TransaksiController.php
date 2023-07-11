<?php

namespace App\Http\Controllers\API\Transaksi;

use App\Http\Controllers\Controller;
use App\Mail\SendReceipt;
use App\Models\Transaksi\DetailTransaksi;
use App\Models\Transaksi\Transaksi;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Mail;

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
                $rowItem->email = $request->email_hp_pelanggan;
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

    public function sendEmail($id)
    {
        try {
            $data = Transaksi::with([
                'products',
                'user'
            ])
             ->findOrFail($id);
             if($data->email == null) {
                return response()->json(['status' => 'error', 'msg' => 'Tidak memasukan email'], 500);
             } else {
                Mail::to($data->email)->send(new SendReceipt($data));
             }
            return response()->json(['status' => 'success', 'msg' => 'Success mengirim email'], 200);
        } catch (\Throwable $th) {
            return response()->json(['status' => 'error', 'msg' => 'Gagal mengirim email', 'error' => $th->getMessage()], 500);
        }
    }

    public function printStuck($id)
    {
        $runTransaction = function () use ($id) {
            try {
                /**
                 * get css
                 * --------------------------------------------------
                 */
                // $path       = 'css/bootstrap.css';
                // $data_type  = pathinfo($path, PATHINFO_EXTENSION);
                // $data_css   = file_get_contents($path);
                // $css        = 'data:text/' . $data_type . ';base64,' . base64_encode($data_css);

                /**
                 * get logo
                 * --------------------------------------------------
                 */
                $path       = 'images/logo.png';
                $type       = pathinfo($path, PATHINFO_EXTENSION);
                $data       = file_get_contents($path);
                $logo       = 'data:image/' . $type . ';base64,' . base64_encode($data);

                $rowItem = Transaksi::with([
                    'products',
                    'user'
                ])
                 ->findOrFail($id);

                /**
                 * RETURN HASIL
                 * --------------------------------------------------
                 */
                $statusCode = JsonResponse::HTTP_OK;
                $status = [
                    'code'      => $statusCode,
                    'name'      => 'success',
                    'message'   => 'export pdf'
                ];

                $result = [
                    'header' => [
                        // 'css' => $css,
                        'logo' => $logo
                    ],
                    'data' => $rowItem,
                ];

                // return $result;

                /**
                 * parsing data ke file blade
                 * --------------------------------------------------
                 */
                $pdf = PDF::loadview('pdf', $result);

                // return view('pdf.profile_pemilik', $result);

                /**
                 * setting options pdf
                 * --------------------------------------------------
                 */
                $pdf = $pdf->setOptions([
                    'dpi' => 100,
                    // 'enable_remote' => true
                ]);

                /**
                 * setting paper pdf
                 * --------------------------------------------------
                 * portrait / landscape
                 */
                $pdf = $pdf->setPaper('a6', 'portrait');

                /**
                 * melakukan download file .pdf
                 * --------------------------------------------------
                 */
                // return $pdf->download('laporan-simaksi-pdf');

                /**
                 * hanya menampilkan file .pdf
                 * --------------------------------------------------
                 */
                return $pdf->stream();
            } catch (Exception $e) {
                // Log::error($e->getMessage(), ['_trace' => $e->getTraceAsString()]);
                // return response()->json([
                //     'message' => $e->getMessage(),
                //     'code' => $e->getCode()
                // ]);
                return response()->json([
                    'error' => 'Unable to create',
                    'msg' => $e->getMessage(),
                ], 400);
            }
        };
        $return = DB::transaction($runTransaction);
        return $return;
    }
}
