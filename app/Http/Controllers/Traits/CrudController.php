<?php

namespace App\Http\Controllers\Traits;

use App\Http\Controllers\Traits\ExceptionResponse;
use App\Http\Controllers\Traits\HasForm;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Schema;

abstract class CrudController extends Controller
{
    use HasForm;
    use ExceptionResponse;

    protected $repository;
    protected $columns;
    protected $model;

    protected $modelName;

    protected $authUser;

    public function __construct()
    {
        $this->repository = app($this->repository);
        $this->authUser = auth()->user();
        $this->model = app($this->model);
        $this->columns = Schema::getColumnListing($this->model->getTable());
        $this->modelName = class_basename($this->model);
    }

    public function index()
    {
        $queryParams = request()->query();

        return $this->repository->all($queryParams);
    }

    public function store()
    {
        $params = $this->formParams();

        try {
            return $this->repository->create($params);
        } catch (\Exception $ex) {
            return $this->exceptionMessage($ex);
        }
    }

    public function show($id)
    {
        $resource = $this->repository->find($id);

        if (!$resource) {
            return $this->errorMessage($this->modelName.' not found', $code = 404, $erros = []);
        }

        return $resource;
    }

    public function update($id)
    {
        $resource = $this->repository->find($id);

        if (!$resource) {
            return $this->errorMessage($this->modelName.' not found', $code = 404, $erros = []);
        }

        return $this->repository->update($resource, $this->formParams());
    }

    public function destroy($id)
    {
        try {
            $resource = $this->repository->find($id);

            if (!$resource) {
                return $this->errorMessage($this->modelName.' not found', $code = 404, $erros = []);
            }

            return $this->repository->delete($resource);
        } catch (\Exception $ex) {
            return $this->exceptionMessage($ex);
        }
    }
}
