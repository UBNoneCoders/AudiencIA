<?php

namespace App\Enums;

enum TableNames: string
{
    case ADDRESSES = 'addresses';
    case AUDITS = 'audits';
    case BENEFIT_COLLABORATOR = 'benefit_collaborator';
    case BENEFITS = 'benefits';
    case CACHE = 'cache';
    case CACHE_LOCKS = 'cache_locks';
    case COLLABORATORS = 'collaborators';
    case CONTACTS = 'contacts';
    case CONTRACTS = 'contracts';
    case DEPARTMENTS = 'departments';
    case DOCUMENTS = 'documents';
    case ENTERPRISES = 'enterprises';
    case EXTRA_TIMES = 'extra_times';
    case FAILED_JOBS = 'failed_jobs';
    case JOB_BATCHES = 'job_batches';
    case JOBS = 'jobs';
    case MEDICINE_AND_SECURITIES = 'medicine_and_securities';
    case MIGRATIONS = 'migrations';
    case MODEL_HAS_PERMISSIONS = 'model_has_permissions';
    case MODEL_HAS_ROLES = 'model_has_roles';
    case PASSWORD_RESET_TOKENS = 'password_reset_tokens';
    case PENALTIES = 'penalties';
    case PERMISSIONS = 'permissions';
    case RESIGNATIONS = 'resignations';
    case ROLE_HAS_PERMISSIONS = 'role_has_permissions';
    case ROLES = 'roles';
    case SESSIONS = 'sessions';
    case USERS = 'users';
    case VACATIONS = 'vacations';

    /**
     * Retorna a tradução do nome da tabela.
     */
    public function label(): string
    {
        return match ($this) {
            self::ADDRESSES => 'Endereços',
            self::AUDITS => 'Auditorias',
            self::BENEFIT_COLLABORATOR => 'Benefícios do Colaborador',
            self::BENEFITS => 'Benefícios',
            self::CACHE => 'Cache',
            self::CACHE_LOCKS => 'Bloqueios de Cache',
            self::COLLABORATORS => 'Colaboradores',
            self::CONTACTS => 'Contatos',
            self::CONTRACTS => 'Contratos',
            self::DEPARTMENTS => 'Departamentos',
            self::DOCUMENTS => 'Documentos',
            self::ENTERPRISES => 'Empresas',
            self::EXTRA_TIMES => 'Horas Extras',
            self::FAILED_JOBS => 'Trabalhos Falhos',
            self::JOB_BATCHES => 'Lotes de Trabalho',
            self::JOBS => 'Trabalhos',
            self::MEDICINE_AND_SECURITIES => 'Medicamentos e Seguranças',
            self::MIGRATIONS => 'Migrações',
            self::MODEL_HAS_PERMISSIONS => 'Modelo tem Permissões',
            self::MODEL_HAS_ROLES => 'Modelo tem Funções',
            self::PASSWORD_RESET_TOKENS => 'Tokens de Recuperação',
            self::PENALTIES => 'Penalidades',
            self::PERMISSIONS => 'Permissões',
            self::RESIGNATIONS => 'Demissões',
            self::ROLE_HAS_PERMISSIONS => 'Função tem Permissões',
            self::ROLES => 'Funções',
            self::SESSIONS => 'Sessões',
            self::USERS => 'Usuários',
            self::VACATIONS => 'Férias',
        };
    }

    /**
     * Retorna a tradução de uma tabela pelo nome original.
     */
    public static function translate(string $table): string
    {
        foreach (self::cases() as $case) {
            if ($case->value === $table) {
                return $case->label();
            }
        }

        return ucfirst(str_replace('_', ' ', $table)); 
    }
}
