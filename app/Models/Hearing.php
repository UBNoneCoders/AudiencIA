<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        'external_id',
    ];

    protected static function booted(): void
    {
        static::creating(function ($hearing) {
            if (empty($hearing->external_id)) {
                $hearing->external_id = Str::uuid();
            }
        });
    }

    public function process()
    {
        return $this->belongsTo(Process::class);
    }
}
