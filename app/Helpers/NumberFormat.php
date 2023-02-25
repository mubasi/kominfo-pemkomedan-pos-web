<?php
namespace App\Helpers;
 
class NumberFormat {

     /**
     * Format Currency Indonesia
     */
    public static function currency($expression, $symbol) {
        $hasil = number_format($expression, 0, ',', '.');
        return $symbol." ".$hasil;
    }

}