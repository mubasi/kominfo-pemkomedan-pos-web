<?php

namespace App\Models\Transaksi;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Alfa6661\AutoNumber\AutoNumberTrait;
use App\Models\Produk\Produk;
use App\Models\User;

class Transaksi extends Model
{
    use HasFactory, SoftDeletes, AutoNumberTrait;

    protected $table = "transaksi";

    public function products()
    {
        return $this->hasMany(DetailTransaksi::class, 'transaksi_id', 'id')->with('item');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_with', 'id');
    }

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
