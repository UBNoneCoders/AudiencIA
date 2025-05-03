<?php

namespace App\Enums;

use App\Enums\Traits\EnumTrait;

enum EducationLevelType: string
{
    use EnumTrait;

    case FUNDAMENTAL_INCOMPLETE = 'fundamental_incomplete';
    case FUNDAMENTAL_COMPLETE = 'fundamental_complete';
    case MEDIUM_INCOMPLETE = 'medium_incomplete';
    case MEDIUM_COMPLETE = 'medium_complete';
    case HIGHER_INCOMPLETE = 'higher_incomplete';
    case HIGHER_COMPLETE = 'higher_complete';
    case POSTGRADUATION = 'postgraduation';
    case MASTERS = 'masters';
    case DOCTORATE = 'doctorate';

    case NOT_INFORMED = 'not_informed';

    public function label(): string
    {
        return match ($this) {
            self::FUNDAMENTAL_INCOMPLETE => 'Ensino Fundamental Incompleto',
            self::FUNDAMENTAL_COMPLETE => 'Ensino Fundamental Completo',
            self::MEDIUM_INCOMPLETE => 'Ensino Médio Incompleto',
            self::MEDIUM_COMPLETE => 'Ensino Médio Completo',
            self::HIGHER_INCOMPLETE => 'Ensino Superior Incompleto',
            self::HIGHER_COMPLETE => 'Ensino Superior Completo',
            self::POSTGRADUATION => 'Pós-graduação',
            self::MASTERS => 'Mestrado',
            self::DOCTORATE => 'Doutorado',
            self::NOT_INFORMED => 'Não informado',
        };
    }
}
