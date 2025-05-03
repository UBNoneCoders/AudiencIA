<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hearing extends Model
{
    use HasFactory;

    protected $fillable = [
        'process_id',
        'type',
        'date',
        'link',
        'status',
        'description',
    ];

    public function process()
    {
        return $this->belongsTo(Process::class);
    }
}
