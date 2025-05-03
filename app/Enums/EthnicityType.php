<?php

namespace App\Enums;

use App\Enums\Traits\EnumTrait;

enum EthnicityType: string
{
    use EnumTrait;

    case WHITE = 'white';
    case BLACK = 'black';
    case BROWN = 'brown';
    case ASIAN = 'asian';
    case INDIGENOUS = 'indigenous';

    case OTHER = 'other';

    public function label(): string
    {
        return match ($this) {
            self::WHITE => 'Branco(a)',
            self::BLACK => 'Preto(a)',
            self::BROWN => 'Pardo(a)',
            self::ASIAN => 'Amarelo(a)',
            self::INDIGENOUS => 'Indígena',
            self::OTHER => 'Outro(a)',
        };
    }
}
