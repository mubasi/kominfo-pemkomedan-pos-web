<?php

namespace App\Models\Produk;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class KategoriProdukRelasi extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kategori_produk_relasi';
}
