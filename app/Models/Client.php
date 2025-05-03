<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'gender',
        'whatsapp',
    ];

    public function processes()
    {
        return $this->hasMany(Process::class);
    }
}
