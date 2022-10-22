<?php

namespace App\Models\Produk;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Produk extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'produk';

    public function gambar_produk()
    {
        return $this->hasMany(ProdukGambar::class, 'produk_id', 'id');
    }

    public function kategori_produk()
    {
        return $this->hasMany(KategoriProdukRelasi::class, 'produk_id', 'id');
    }
}
