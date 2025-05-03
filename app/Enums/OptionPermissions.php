<?php

namespace App\Enums;

enum OptionPermissions: string
{
    case LIST = 'list';
    case CREATE = 'create';
    case EDIT = 'edit';
    case DELETE = 'delete';
    case SHOW = 'show';

    public function label(): string
    {
        return match ($this) {
            OptionPermissions::LIST => 'Listar',
            OptionPermissions::CREATE => 'Criar',
            OptionPermissions::EDIT => 'Editar',
            OptionPermissions::DELETE => 'Deletar',
            OptionPermissions::SHOW => 'Visualizar',
        };
    }

    public static function optionsForTables(): array
    {
        return [
            OptionPermissions::LIST,
            OptionPermissions::CREATE,
            OptionPermissions::EDIT,
            OptionPermissions::DELETE,
        ];
    }

    public static function translate(string $option): string
    {
        foreach (self::cases() as $case) {
            if ($case->value === $option) {
                return $case->label();
            }
        }

        return $option;
    }
}
