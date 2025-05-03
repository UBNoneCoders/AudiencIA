<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Database\Eloquent\Model;
use Closure;

trait RepositoryTrait
{
    /**
     * Find a model by its UUID.
     *
     * @param Model  $model
     * @param string $uuid
     * @return Model
     */
    public function findByUuid(Model $model, string $uuid): Model
    {
        return $model::where('external_id', $uuid)->firstOrFail();
    }

    /**
     * Monta opções para select no front-end.
     *
     * @param Model               $model       Instância ou classe do model a ser consultado
     * @param Closure|array|null  $query       Callback para customizar query ou array de condições onde
     * @param string              $labelColumn Nome da coluna que será usada como label
     * @param string              $valueColumn Nome da coluna que será usada como value
     * @return array                            Array de opções ['label' => ..., 'value' => ...]
     */
    public function options(Model $model, $query = null, string $labelColumn = 'name', string $valueColumn = 'id'): array
    {
        $builder = $model::query();

        if ($query instanceof Closure) {
            $query($builder);
        } elseif (is_array($query) && count($query)) {
            $builder->where($query);
        }

        $results = $builder->get([$labelColumn, $valueColumn]);

        return $results->map(function ($item) use ($labelColumn, $valueColumn) {
            return [
                'label' => $item->{$labelColumn},
                'value' => $item->{$valueColumn},
            ];
        })->toArray();
    }
}
