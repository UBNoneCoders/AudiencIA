<?php

namespace App\Enums;

use App\Enums\Traits\EnumTrait;

enum CivilStatusType: string
{
    use EnumTrait;

    case SINGLE = 'single';
    case MARRIED = 'married';
    case DIVORCED = 'divorced';
    case WIDOWED = 'widowed';
    case SEPARATED = 'separated';

    public function label() {
        return match ($this) {
            self::SINGLE => 'Solteiro(a)',
            self::MARRIED => 'Casado(a)',
            self::DIVORCED => 'Divorciado(a)',
            self::WIDOWED => 'Viúvo(a)',
            self::SEPARATED => 'Separado(a)',
        };
    }
}
