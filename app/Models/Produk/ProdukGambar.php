<?php

namespace App\Models\Produk;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProdukGambar extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'produk_gambar';
}
