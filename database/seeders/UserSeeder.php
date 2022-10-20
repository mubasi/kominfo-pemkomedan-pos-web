<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $dataUser = [
            [
                'email' => 'maintenance@gmail.com',
                'name' => 'Maintenance',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('12345678'),
                'created_at' => Carbon::now(),
                'active' => 'Y'
            ],
            [
                'email' => 'admin@gmail.com',
                'name' => 'Admin',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('admin123'),
                'created_at' => Carbon::now(),
                'active' => 'Y'
            ],
            [
                'email' => 'kasir1@gmail.com',
                'name' => 'Kasir1',
                'email_verified_at' => Carbon::now(),
                'password' => Hash::make('12345678'),
                'created_at' => Carbon::now(),
                'active' => 'Y'
            ],
        ];
        foreach ($dataUser as $key => $value) {
            $no = $key + 1;
            $userRole = User::create($value);
            $userRole->assignRole($no);
        }
    }
}
