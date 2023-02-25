@php
    use App\Helpers\NumberFormat;
@endphp
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title> {{ $data['kode_transaksi'] }} </title>
    <meta name=viewport content="width=device-width, initial-scale=1">
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            text-align: right;
            padding: .4em;
        }

        tr th:first-child,
        tr td:first-child {
            text-align: left;
            width: 90%;
            /* Force description column to take more space */
        }

        tfoot tr td {
            font-weight: bold;
            border-top: 1px black solid;
            border-bottom: 1px black solid;
        }
    </style>
</head>

<body>
    <div style="padding: 20%">
        <div style="text-align: center">
            <span style="font-weight: bold; font-size: 16px">{{ env('APP_NAME') }}</span><br>
            <span>{{ env('APP_ADDRESS') }}</span><br>
            <span>{{ env('APP_PHONE') }}</span>
            <span>
                <hr>
            </span>
        </div>
        <table style="margin-top: 5px">
            <thead>
                <tr>
                    <td colspan="4">
                        <div style="text-align: justify;text-justify: inter-word">
                            {{ $data['kode_transaksi'] }} - {{ $data['user']['name'] }} - {{ $data['created_at'] }}
                        </div>
                    </td>
                </tr>
            </thead>
            <thead>
                <tr>
                    <td>Nama Menu</td>
                    <td>Qty</td>
                    <td>Harga</td>
                    <td>Total</td>
                </tr>
            </thead>
            <tbody>
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
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" width="100%" align="left">
                        Total Harga
                    </td>
                    <td align="right">
                        {{ NumberFormat::currency($data['total_harga'], 'Rp. ') }}
                    </td>
                </tr>
            </tfoot>
        </table>

        <div style="text-align: center; margin-top 50px">
            <span> Terimakasih telah berbelanja</span><br>
            <span>Silahkan menikmati</span>
            <span>
                <hr>
            </span>
        </div>
    </div>
</body>

</html>
