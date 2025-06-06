# ⚖️ AudiêncIA

Este projeto tem como objetivo facilitar a **gestão de audiências jurídicas**, oferecendo uma plataforma eficiente e intuitiva para que **advogados** e **funcionários** possam organizar compromissos, gerenciar equipes e acompanhar o andamento de processos jurídicos de forma centralizada.

A aplicação foi desenvolvida como parte da disciplina de **Inteligência Artificial** do curso de Sistemas de Informação da **Unibalsas**, ministrada pelo professor **Marcos David Souza Ramos**. Utilizando **Laravel** no backend e **React** no frontend, o sistema também integra serviços como **Supabase**, **n8n** e **OpenAI Agent**, a fim de proporcionar **automação inteligente** e maior eficiência na execução de tarefas recorrentes.

---

## 🚀 Tecnologias Utilizadas

* **Laravel** – Framework PHP para criação de aplicações web com arquitetura MVC e comandos Artisan.
* **React** – Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas.
* **Supabase** – Backend como serviço com banco de dados PostgreSQL, autenticação e APIs em tempo real.
* **N8N** – Plataforma open source de automação de fluxos e integração entre serviços e APIs.
* **OpenAI Agent** – Agente de inteligência artificial para geração de respostas e interpretação de dados.
* **Evolution** – Serviço de integração com WhatsApp para envio de mensagens automatizadas.
* **DigitalOcean** – Plataforma de cloud computing para hospedagem e deploy de aplicações.

---

## 🖼️ Imagens do Projeto

* Página de login

![FireShot Capture 008 - Login - AudiêncIA -  192 241 153 164](https://github.com/user-attachments/assets/41449757-2a53-4d11-9f4c-94dcdd8862c6)

* Dashboard

![dashboard](https://github.com/user-attachments/assets/f97f7eba-9786-4e6d-84cb-ea8d5ec54dd4)

* Tela de cadastro de usuários (restrito a advogados)

![usuarios](https://github.com/user-attachments/assets/6ff4a75d-9ede-4576-a0af-3c852ee8f2bb)

* Tela de cadastro de audiência

![audiencias](https://github.com/user-attachments/assets/9da7c451-9214-4a14-81fa-25461ac93fb7)


* Tela de cadastro de processos

![processos](https://github.com/user-attachments/assets/2a11bd3f-6499-49dc-96c1-75a9aca0e1df)


* Tela de cadastro de clientes

![clientes](https://github.com/user-attachments/assets/61cc279a-c869-457a-93b8-39f6bfe51ea7)


---

## 🔁 Integrações

### Supabase

Gerenciamento da base de dados em tempo real.

![supabase-schema-tamhqdbhaytvncdshyqk (3)](https://github.com/user-attachments/assets/1df172d1-59c7-4e87-b2ba-c0d1896e26fc)

---

### N8N

Automatizações de fluxo para envio automatizado de mensagens via WhatsApp, utilizando a integração com a plataforma Evolution.

![Captura de tela de 2025-06-06 09-29-08](https://github.com/user-attachments/assets/87a7e16e-4b44-431c-bcba-f4e114d0e966)


---

## 🛠️ Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local:

### 1. Clone o repositório

```bash
git clone https://github.com/seu-repositorio.git
cd nome-do-projeto
```

### 2. Instale as dependências

```bash
composer install
npm install
```

### 3. Configure o ambiente

* Copie o arquivo `.env.example` e renomeie para `.env`
* Atualize as variáveis de ambiente com suas credenciais (Supabase, etc.)

### 4. Execute as migrations

```bash
php artisan migrate
```

### 5. Inicie o servidor

```bash
php artisan serve
npm run dev
```

---


## 👥 Participantes

* **Matheus Augusto da Silva Santos <matheus.santos@alu.unibalsas.edu.br>** – Desenvolvedor Fullstack
* **Luan Jacomini Kloh <luan.kloh@alu.unibalsas.edu.br>** – Desenvolvedor Back-End
* **Guilherme Felipe Mendonça Noleto De Araújo <guilherme.araujo@alu.unibalsas.edu.br>** – Desenvolvedor de Integrações (N8N)

---

## 🤝 Considerações Finais

Este projeto representa o esforço conjunto de toda a equipe e o aprendizado adquirido ao longo da disciplina. Agradecemos a todos que colaboraram direta ou indiretamente para a sua realização.

Estamos abertos a sugestões, melhorias e futuras parcerias que possam enriquecer ainda mais esta plataforma.
