<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDetailTransaksiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detail_transaksi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaksi_id')
                ->constrained('transaksi')
                ->onUpdate('cascade')
                ->onDelete('restrict')
                ->comment('');
            $table->foreignId('produk_id')
                ->constrained('produk')
                ->onUpdate('cascade')
                ->onDelete('restrict')
                ->comment('');
            $table->string('qty');
            $table->string('hpp');
            $table->string('harga');
            $table->string('jumlah_modal');
            $table->string('jumlah');
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
        Schema::dropIfExists('detail_transaksi');
    }
}
