<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Process extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'author_name',
        'opposing_party_name',
        'process_number',
        'case_reason',
        'case_value',
        'description',
        'external_id'
    ];

        protected static function booted(): void
    {
        static::creating(function ($hearing) {
            if (empty($hearing->external_id)) {
                $hearing->external_id = Str::uuid();
            }
        });
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function hearings()
    {
        return $this->hasMany(Hearing::class);
    }
}
