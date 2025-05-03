<?php

namespace App\Http\Controllers\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

trait ValidatesRequests
{
    public function validateRequest(Request $request, array $rules, int $type_response = 0, array $messagesError = [], int $code = 422, string $status = 'error')
    {
        $validator = Validator::make($request->all(), $rules, $messagesError);

        if ($validator->fails()) {
            if ($type_response === 0) {
                return response()->json([
                    'status' => 'error',
                    'error' => $validator->errors()->first(),
                    'errors' => $validator->errors()->all(),
                ], $code)->throwResponse();
            } elseif ($type_response === 1) {
                return response()->json([
                    'status' => $status,
                    'msg' => 'Campo obrigatório não preechido',
                    'errors' => $validator->errors()->all(),
                ], $code)->throwResponse();
            }

            return $validator->errors();
        }

        return $validator->validated();
    }
}
