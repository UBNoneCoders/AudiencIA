<?php

namespace App\Http\Controllers;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class AuthController extends Controller
{
    use \App\Http\Controllers\Traits\ValidatesRequests;
    use AuthorizesRequests;
    use Traits\RepositoryTrait;

    protected $model;

    protected $authUser;

    public function __construct()
    {
        $this->authUser = auth()->user();
    }
}
