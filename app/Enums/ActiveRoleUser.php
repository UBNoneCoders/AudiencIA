<?php

namespace App\Enums;

use App\Enums\Traits\EnumTrait;

enum ActiveRoleUser: string
{
    use EnumTrait;

    case LAWYER = 'Advogado(a)';
    case EMPLOYEE = 'Funcionário(a)';

    case DEFAULT = 'Padrão';

    public function hierarchyLevel(): string
    {
        return match ($this) {
            self::LAWYER => '1',
            self::EMPLOYEE => '2',
        };
    }
}
