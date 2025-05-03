<?php

namespace Database\Seeders;

use App\Enums\ActiveRoleUser;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'advogado@adv.com'],
            [
                'external_id' => Str::uuid()->toString(),
                'name' => 'Advogado(a) Sousa Alencar',
                'password' => bcrypt('adm@adv'),
                'role' => '1',
                'email_verified_at' => now(),
            ]
        );

        User::updateOrCreate(
            ['email' => 'funcionario@adv.com'],
            [
                'external_id' => Str::uuid()->toString(),
                'name' => 'Funcionário(a) Sousa Alencar',
                'password' => bcrypt('funcionario@adv'),
                'role' => '2',
                'email_verified_at' => now(),
            ]
        );
    }
}
