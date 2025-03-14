📌 AudiencIA

Este projeto tem como objetivo facilitar a gestão de audiências jurídicas, proporcionando uma plataforma eficiente para advogados e funcionários organizarem compromissos, gerenciarem equipes e acompanharem processos. Utilizando Laravel e Supabase, a aplicação oferece autenticação de usuários, permissões diferenciadas, um sistema de CRUD para advogados, funcionários e audiências.

🚀 Tecnologias Utilizadas

Laravel

Supabase

N8N

ChatGPT

[Outras tecnologias utilizadas]

👥 Equipe

Guilherme - Criação do repositório, documentação

Matheus - Configuração de tasks, modelagem de classes

Luan - Modelagem do banco de dados

📅 Planejamento do Desenvolvimento

🔹 Sprint 1: Configuração Inicial do Projeto

Criação do repositório

Configuração de tasks

Modelagem de classes e banco de dados (ER)

Documentação inicial

🔹 Sprint 2: Desenvolvimento Inicial e Autenticação

Configurar ambiente Laravel e Supabase

Criar estrutura do banco no Supabase

Configurar autenticação de usuários (Login/Registro)

Implementar sistema de permissões (Advogado vs Funcionário)

Criar interface básica de login e dashboard

Testar autenticação

🔹 Sprint 3: Gestão de Perfis de Usuários

Criar tabelas para advogados e funcionários

Implementar CRUD de advogados

Implementar CRUD de funcionários (Apenas advogados podem gerenciar)

Criar tela de gerenciamento de equipe para advogados

Testar permissões de usuário

🔹 Sprint 4: CRUD de Audiências

Criar tabela de audiências no Supabase

Implementar CRUD de audiências

Criar interface para visualização e gerenciamento das audiências

Implementar notificações básicas no dashboard

🔹 Sprint 5: Organização e Visualização das Audiências

Criar um calendário para exibição das audiências

Implementar status para audiências (Aberta, Concluída, Cancelada, Adiada)

Criar sistema de buscas

Implementar ordenação e paginação

Melhorar UI/UX para facilitar a navegação

🔹 Sprint 6: Finalização

Testes finais e correção de bugs

Preparação para o deploy

Configuração do Agente ChatGPT

Integração N8N (Agente e Supabase)

🛠️ Como Rodar o Projeto

Clone o repositório:

git clone https://github.com/seu-repositorio.git

Acesse a pasta do projeto:

cd nome-do-projeto

Instale as dependências:

composer install

Configure o arquivo .env conforme o modelo .env.example.

Execute as migrations:

php artisan migrate

Inicie o servidor:

php artisan serve

📄 Licença

[Adicione aqui a licença do projeto, se houver.]

📌 Projeto desenvolvido para facilitar a gestão de audiências e equipes jurídicas.

