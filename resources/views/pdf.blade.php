@php
    
    use App\Helpers\NumberFormat;
    use Carbon\Carbon;
    // use App\Models\JenisPemasaran\JenisPemasaran;
@endphp

<!DOCTYPE html>
<html>

<head>
    <title>Print Struk {{ $data['kode_transaksi'] }}</title>
    <!-- Meta Tag -->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>


<body style="font-size:11px; line-height: 1.3;">
    <div style="page-break-inside: auto; page-break-inside: avoid;">
        <table class="table table-bordered table-sm">
            <thead>
                <tr>
                    {{-- <td width='15%' align='center'
                        style='background-color:#FFF; border-right-color:#FFF; border-left-color:#FFF;'>
                        <img src="{{ $header['logo'] }}" width='40px'>
                    </td> --}}
                    <td width='100%' class="text-center align-middle"
                        style='border: hidden; background-color:#FFF; border-right-color:#FFF'>
                        <span style="font-size=24px">
                            <strong>
                                {{ env('APP_NAME') }}
                            </strong>
                        </span>
                        <br>
                        <span>
                            {{ env('APP_ADDRESS') }}
                        </span>
                        <br>
                        <span>
                            {{ env('APP_PHONE') }}
                        </span>
                    </td>
                    {{-- <td width='10%' align='center'
                        style='background-color:#FFF; border-right-color:#FFF; border-left-color:#FFF;'>
                    </td> --}}
                </tr>
            </thead>
        </table>


        <table class="table table-sm table-striped" style="margin:0 !important;padding:0 !important">
            <tr>
                <td colspan="4" width="100%">
                    <div style="text-align: justify;text-justify: inter-word">
                        {{ $data['kode_transaksi'] }} - {{ $data['user']['name'] }} - {{ $data['created_at'] }}
                    </div>
                </td>
            </tr>
            <tr>
                <td>Nama Menu</td>
                <td>Qty</td>
                <td>Harga</td>
                <td>Total</td>
            </tr>

            @foreach ($data['products'] as $item)
                <tr class="text-size " style="border: hidden; margin:0 !important;padding:0 !important">
                    <td width="40%">
                        {{ $item['item']['nama'] }}
                    </td>
                    <td width="10%" align="right">
                        {{ $item['qty'] }}
                    </td>
                    <td width="25%" align="right">
                        {{ NumberFormat::currency($item['harga'], 'Rp. ') }}
                    </td>
                    <td width="25%" align="right">
                        {{ NumberFormat::currency($item['jumlah'], 'Rp. ') }}
                    </td>
                </tr>
            @endforeach

            <tr>
                <td colspan="4">
                    <br><br>
                </td>
            </tr>

            <tr>
                <td colspan="3" width="100%" align="left">
                    Total Harga
                </td>
                <td align="right">
                    {{ NumberFormat::currency($data['total_harga'], 'Rp. ') }}
                </td>
            </tr>
        </table>

        <table class="table table-bordered table-sm mt-5">
            <thead>
                <tr>
                    <td width='100%' class="text-center align-middle"
                        style='border: hidden; background-color:#FFF; border-right-color:#FFF'>
                        <span style="font-size=24px">
                            Terimakasih telah berbelanja
                            <br>
                            Selamat menikmati
                        </span>
                    </td>
                </tr>
            </thead>
        </table>
    </div>
</body>


<style lang="css">
    /**
 * table
 * --------------------------------------------------
 */
    table {
        border-collapse: collapse;
    }

    .table {
        width: 100%;
        margin-bottom: 1rem;
        color: #212529;
    }

    .table th,
    .table td {
        padding: 0.75rem;
        vertical-align: top;
        border-top: 1px solid #dee2e6;
    }

    .table thead th {
        vertical-align: bottom;
        border-bottom: 2px solid #dee2e6;
    }

    .table tbody+tbody {
        border-top: 2px solid #dee2e6;
    }

    .table-sm th,
    .table-sm td {
        padding: 0.3rem;
    }

    .table-bordered {
        border: 1px solid #dee2e6;
    }

    .table-bordered th,
    .table-bordered td {
        border: 1px solid #dee2e6;
    }

    .table-bordered thead th,
    .table-bordered thead td {
        border-bottom-width: 2px;
    }

    .table-borderless th,
    .table-borderless td,
    .table-borderless thead th,
    .table-borderless tbody+tbody {
        border: 0;
    }

    /**
 *  divider
 *  --------------------------------------------------
 */
    hr {
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    }

    /* hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
} */

    /**
 *  text
 *  --------------------------------------------------
 */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin-top: 0;
        margin-bottom: 0.5rem;
    }

    p {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .h1,
    .h2,
    .h3,
    .h4,
    .h5,
    .h6 {
        margin-bottom: 0.5rem;
        font-weight: 500;
        line-height: 1.2;
    }

    h1,
    .h1 {
        font-size: 2.5rem;
    }

    h2,
    .h2 {
        font-size: 2rem;
    }

    h3,
    .h3 {
        font-size: 1.75rem;
    }

    h4,
    .h4 {
        font-size: 1.5rem;
    }

    h5,
    .h5 {
        font-size: 1.25rem;
    }

    h6,
    .h6 {
        font-size: 1rem;
    }

    /**
 *  margin dan padding
 *  --------------------------------------------------
 */
    .m-0 {
        margin: 0 !important;
    }

    .mt-0,
    .my-0 {
        margin-top: 0 !important;
    }

    .mr-0,
    .mx-0 {
        margin-right: 0 !important;
    }

    .mb-0,
    .my-0 {
        margin-bottom: 0 !important;
    }

    .ml-0,
    .mx-0 {
        margin-left: 0 !important;
    }

    .m-1 {
        margin: 0.25rem !important;
    }

    .mt-1,
    .my-1 {
        margin-top: 0.25rem !important;
    }

    .mr-1,
    .mx-1 {
        margin-right: 0.25rem !important;
    }

    .mb-1,
    .my-1 {
        margin-bottom: 0.25rem !important;
    }

    .ml-1,
    .mx-1 {
        margin-left: 0.25rem !important;
    }

    .m-2 {
        margin: 0.5rem !important;
    }

    .mt-2,
    .my-2 {
        margin-top: 0.5rem !important;
    }

    .mr-2,
    .mx-2 {
        margin-right: 0.5rem !important;
    }

    .mb-2,
    .my-2 {
        margin-bottom: 0.5rem !important;
    }

    .ml-2,
    .mx-2 {
        margin-left: 0.5rem !important;
    }

    .m-3 {
        margin: 1rem !important;
    }

    .mt-3,
    .my-3 {
        margin-top: 1rem !important;
    }

    .mr-3,
    .mx-3 {
        margin-right: 1rem !important;
    }

    .mb-3,
    .my-3 {
        margin-bottom: 1rem !important;
    }

    .ml-3,
    .mx-3 {
        margin-left: 1rem !important;
    }

    .m-4 {
        margin: 1.5rem !important;
    }

    .mt-4,
    .my-4 {
        margin-top: 1.5rem !important;
    }

    .mr-4,
    .mx-4 {
        margin-right: 1.5rem !important;
    }

    .mb-4,
    .my-4 {
        margin-bottom: 1.5rem !important;
    }

    .ml-4,
    .mx-4 {
        margin-left: 1.5rem !important;
    }

    .m-5 {
        margin: 3rem !important;
    }

    .mt-5,
    .my-5 {
        margin-top: 3rem !important;
    }

    .mr-5,
    .mx-5 {
        margin-right: 3rem !important;
    }

    .mb-5,
    .my-5 {
        margin-bottom: 3rem !important;
    }

    .ml-5,
    .mx-5 {
        margin-left: 3rem !important;
    }

    .p-0 {
        padding: 0 !important;
    }

    .pt-0,
    .py-0 {
        padding-top: 0 !important;
    }

    .pr-0,
    .px-0 {
        padding-right: 0 !important;
    }

    .pb-0,
    .py-0 {
        padding-bottom: 0 !important;
    }

    .pl-0,
    .px-0 {
        padding-left: 0 !important;
    }

    .p-1 {
        padding: 0.25rem !important;
    }

    .pt-1,
    .py-1 {
        padding-top: 0.25rem !important;
    }

    .pr-1,
    .px-1 {
        padding-right: 0.25rem !important;
    }

    .pb-1,
    .py-1 {
        padding-bottom: 0.25rem !important;
    }

    .pl-1,
    .px-1 {
        padding-left: 0.25rem !important;
    }

    .p-2 {
        padding: 0.5rem !important;
    }

    .pt-2,
    .py-2 {
        padding-top: 0.5rem !important;
    }

    .pr-2,
    .px-2 {
        padding-right: 0.5rem !important;
    }

    .pb-2,
    .py-2 {
        padding-bottom: 0.5rem !important;
    }

    .pl-2,
    .px-2 {
        padding-left: 0.5rem !important;
    }

    .p-3 {
        padding: 1rem !important;
    }

    .pt-3,
    .py-3 {
        padding-top: 1rem !important;
    }

    .pr-3,
    .px-3 {
        padding-right: 1rem !important;
    }

    .pb-3,
    .py-3 {
        padding-bottom: 1rem !important;
    }

    .pl-3,
    .px-3 {
        padding-left: 1rem !important;
    }

    .p-4 {
        padding: 1.5rem !important;
    }

    .pt-4,
    .py-4 {
        padding-top: 1.5rem !important;
    }

    .pr-4,
    .px-4 {
        padding-right: 1.5rem !important;
    }

    .pb-4,
    .py-4 {
        padding-bottom: 1.5rem !important;
    }

    .pl-4,
    .px-4 {
        padding-left: 1.5rem !important;
    }

    .p-5 {
        padding: 3rem !important;
    }

    .pt-5,
    .py-5 {
        padding-top: 3rem !important;
    }

    .pr-5,
    .px-5 {
        padding-right: 3rem !important;
    }

    .pb-5,
    .py-5 {
        padding-bottom: 3rem !important;
    }

    .pl-5,
    .px-5 {
        padding-left: 3rem !important;
    }

    /**
     * text align
     * --------------------------------------------------
     */
    .text-monospace {
        font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
    }

    .text-justify {
        text-align: justify !important;
    }

    .text-wrap {
        white-space: normal !important;
    }

    .text-nowrap {
        white-space: nowrap !important;
    }

    .text-truncate {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .text-left {
        text-align: left !important;
    }

    .text-right {
        text-align: right !important;
    }

    .text-center {
        text-align: center !important;
    }

    .align-baseline {
        vertical-align: baseline !important;
    }

    .align-top {
        vertical-align: top !important;
    }

    .align-middle {
        vertical-align: middle !important;
    }

    .align-bottom {
        vertical-align: bottom !important;
    }

    .align-text-bottom {
        vertical-align: text-bottom !important;
    }

    .align-text-top {
        vertical-align: text-top !important;
    }
</style>


</html>
