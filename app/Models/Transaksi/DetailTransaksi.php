<?php

namespace App\Models\Transaksi;

use App\Models\Produk\Produk;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DetailTransaksi extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'detail_transaksi';

    public function item()
    {
        return $this->belongsTo(Produk::class, 'produk_id', 'id');
    }
}
