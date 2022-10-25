<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Alfa6661\AutoNumber\AutoNumberTrait;

class Transaksi extends Model
{
    use HasFactory, SoftDeletes, AutoNumberTrait;

    protected $table = "transaksi";

    public function getAutoNumberOptions()
    {
        return [
            'kode_transaksi' => [
                'format' => function () {
                    return date('Ymd') . '/INV/?';
                },
                'length' => 5 // Jumlah digit yang akan digunakan sebagai nomor urut
            ]
        ];
    }
}
