<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKategoriProdukRelasiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kategori_produk_relasi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('produk_id')
                ->constrained('produk')
                ->onUpdate('cascade')
                ->onDelete('restrict')
                ->comment('');
            $table->foreignId('kategori_produk_id')
                ->constrained('kategori_produk')
                ->onUpdate('cascade')
                ->onDelete('restrict')
                ->comment('');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kategori_produk_relasi');
    }
}
