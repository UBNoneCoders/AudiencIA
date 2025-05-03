<?php

namespace App\Http\Requests\Collaborator;

use App\Enums\CivilStatusType;
use App\Enums\EducationLevelType;
use App\Enums\EthnicityType;
use App\Http\Requests\CrudRequest;
use App\Models\Collaborator;
use Illuminate\Validation\Rule;

class CollaboratorRequest extends CrudRequest
{
    protected $type = Collaborator::class;

    /**
     * Regras para atualização (editar).
     */
    protected function editRules(): array
    {
        return [
            // collaborator
            'collaborator'              => ['sometimes', 'array'],
            'collaborator.name'         => ['sometimes', 'string', 'max:255'],
            'collaborator.civil_status' => ['sometimes', Rule::in(CivilStatusType::values())],
            'collaborator.nationality'  => ['sometimes', 'string', 'max:255'],
            'collaborator.birthplace'   => ['sometimes', 'string', 'max:255'],
            'collaborator.date_birth'   => ['sometimes', 'date', 'before:today'],
            'collaborator.mother_name'  => ['sometimes', 'string', 'max:255'],
            'collaborator.education'    => ['sometimes', Rule::in(EducationLevelType::values())],
            'collaborator.is_deficie'   => ['sometimes', 'boolean'],
            'collaborator.ethnicity'    => ['sometimes', Rule::in(EthnicityType::values())],

            // address
            'address'                   => ['sometimes', 'array'],
            'address.zip_code'          => ['sometimes', 'string', 'max:20'],
            'address.public_place'      => ['sometimes', 'string', 'max:255'],
            'address.number'            => ['sometimes', 'string', 'max:50'],
            'address.complement'        => ['sometimes', 'string', 'max:255', 'nullable'],
            'address.neighborhood'      => ['sometimes', 'string', 'max:255'],
            'address.city'              => ['sometimes', 'string', 'max:255'],
            'address.state'             => ['sometimes', 'string', 'max:100'],
            'address.country'           => ['sometimes', 'string', 'max:100'],

            // contact
            'contact'                   => ['sometimes', 'array'],
            'contact.cell_phone'        => ['sometimes', 'string', 'max:20'],
            'contact.telephone'         => ['sometimes', 'string', 'max:20'],
            'contact.emergency_phone'   => ['sometimes', 'string', 'max:20'],
            'contact.personal_email'    => ['sometimes', 'email', 'max:255'],
            'contact.business_email'    => ['sometimes', 'email', 'max:255'],

            // document
            'document'                      => ['sometimes', 'array'],
            'document.cell_phone'           => ['sometimes', 'string', 'max:20'],
            'document.cpf'                  => ['sometimes', 'string', 'max:20'],
            'document.rg'                   => ['sometimes', 'string', 'max:20'],
            'document.issuing_authority'    => ['sometimes', 'string', 'max:255'],
            'document.shipping_date'        => ['sometimes', 'date', 'before:today'],
            'document.cnh'                  => ['sometimes', 'string', 'max:50'],
            'document.reservist'            => ['sometimes', 'string', 'max:50'],
            'document.voter_registration'   => ['sometimes', 'string', 'max:50'],
            'document.polling_station'      => ['sometimes', 'string', 'max:50'],
            'document.electoral_zone'       => ['sometimes', 'string', 'max:50'],
            'document.bank'                 => ['sometimes', 'string', 'max:100'],
            'document.agency'               => ['sometimes', 'string', 'max:50'],
            'document.current_account'      => ['sometimes', 'string', 'max:50'],
            'document.pis'                  => ['sometimes', 'string', 'max:20'],
            'document.ctps_number'          => ['sometimes', 'string', 'max:20'],
            'document.ctps_series'          => ['sometimes', 'string', 'max:20'],
        ];
    }

    /**
     * Regras para criação.
     */
    protected function createRules(): array
    {
        return [
            // collaborator
            'collaborator'              => ['required', 'array'],
            'collaborator.name'         => ['required', 'string', 'max:255'],
            'collaborator.civil_status' => ['required', Rule::in(CivilStatusType::values())],
            'collaborator.nationality'  => ['required', 'string', 'max:255'],
            'collaborator.birthplace'   => ['required', 'string', 'max:255'],
            'collaborator.date_birth'   => ['required', 'date', 'before:today'],
            'collaborator.mother_name'  => ['required', 'string', 'max:255'],
            'collaborator.education'    => ['required', Rule::in(EducationLevelType::values())],
            'collaborator.is_deficie'   => ['required', 'boolean'],
            'collaborator.ethnicity'    => ['required', Rule::in(EthnicityType::values())],

            // address
            'address'                   => ['required', 'array'],
            'address.zip_code'          => ['required', 'string', 'max:20'],
            'address.public_place'      => ['required', 'string', 'max:255'],
            'address.number'            => ['required', 'string', 'max:50'],
            'address.complement'        => ['nullable', 'string', 'max:255'],
            'address.neighborhood'      => ['required', 'string', 'max:255'],
            'address.city'              => ['required', 'string', 'max:255'],
            'address.state'             => ['required', 'string', 'max:100'],
            'address.country'           => ['required', 'string', 'max:100'],

            // contact
            'contact'                   => ['required', 'array'],
            'contact.cell_phone'        => ['required', 'string', 'max:20'],
            'contact.telephone'         => ['required', 'string', 'max:20'],
            'contact.emergency_phone'   => ['required', 'string', 'max:20'],
            'contact.personal_email'    => ['required', 'email', 'max:255'],
            'contact.business_email'    => ['required', 'email', 'max:255'],

            // document
            'document'                      => ['required', 'array'],
            'document.cell_phone'           => ['required', 'string', 'max:20'],
            'document.cpf'                  => ['required', 'string', 'max:20'],
            'document.rg'                   => ['required', 'string', 'max:20'],
            'document.issuing_authority'    => ['required', 'string', 'max:255'],
            'document.shipping_date'        => ['required', 'date', 'before:today'],
            'document.cnh'                  => ['required', 'string', 'max:50'],
            'document.reservist'            => ['required', 'string', 'max:50'],
            'document.voter_registration'   => ['required', 'string', 'max:50'],
            'document.polling_station'      => ['required', 'string', 'max:50'],
            'document.electoral_zone'       => ['required', 'string', 'max:50'],
            'document.bank'                 => ['required', 'string', 'max:100'],
            'document.agency'               => ['required', 'string', 'max:50'],
            'document.current_account'      => ['required', 'string', 'max:50'],
            'document.pis'                  => ['required', 'string', 'max:20'],
            'document.ctps_number'          => ['required', 'string', 'max:20'],
            'document.ctps_series'          => ['required', 'string', 'max:20'],
        ];
    }

    /**
     * Regras comuns a create/edit.
     */
    public function baseRules(): array
    {
        return [];
    }
}
