<?php

namespace App\Enums\Traits;

trait EnumTrait
{
    /**
     * Retorna o label correspondente ao valor do enum.
     */
    protected static function notFoundLabel(): string
    {
        return "Não informado";
    }

    /**
     * Retorna um array com todos os valores do enum.
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Retorna a instância do enum correspondente ao valor ou null se não existir.
     */
    public static function getClass(int|string $value): ?static
    {
        return self::tryFrom($value);
    }

    /**
     * Retorna o label correspondente ao valor ou "Não informado" se não existir.
     */
    public static function getLabel(int|string $value): string
    {
        return self::tryFrom($value)?->label() ?? self::notFoundLabel();
    }

    /**
     * Retorna um array formatado com label e value para uso em selects.
     *
     * @return array<array{label: string, value: int|string}>
     */
    public static function options(): array
    {
        return array_map(function ($case) {
            return [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }, self::cases());
    }
}
