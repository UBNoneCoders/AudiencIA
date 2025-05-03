<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function hearings()
    {
        return $this->hasMany(Hearing::class);
    }
}
