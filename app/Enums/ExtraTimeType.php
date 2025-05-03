<?php

namespace App\Enums;

use App\Enums\Traits\EnumTrait;

enum ExtraTimeType: string
{
    use EnumTrait;

    case TIME_BANK = 'time_bank';
    case EXTRA_50 = 'extra_50';
    case EXTRA_100 = 'extra_100';

    public function label() {
        return match ($this) {
            self::TIME_BANK => 'Banco de Horas',
            self::EXTRA_50 => 'Hora Extra 50%',
            self::EXTRA_100 => 'Hora Extra 100%',
        };
    }
}
