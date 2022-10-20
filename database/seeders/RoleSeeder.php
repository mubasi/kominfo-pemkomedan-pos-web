<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;
use Illuminate\Support\Facades\Schema;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Schema::disableForeignKeyConstraints();
        Role::truncate();
        $roles = [
            [
                'name' => 'Maintenance',
                // 'description' => 'User yang memiliki role (peran) sebagai Maintenance akan dapat mengakses seluruh menu dari Sistem Informasi ini.'
            ],
            [
                'name' => 'Administrator',
                // 'description' => 'User yang memiliki role (peran) sebagai Administrator akan dapat mengakses seluruh menu dari Sistem Informasi ini.'
            ],
            [
                'name' => 'Kasir',
                // 'description' => 'User yang memiliki role (peran) sebagai Operator akan dapat mengakses beberapa menu dari Sistem Informasi ini.'
            ],
        ];

        foreach($roles as $role){
            Role::create($role);
        }

        Schema::enableForeignKeyConstraints();
    }
}
