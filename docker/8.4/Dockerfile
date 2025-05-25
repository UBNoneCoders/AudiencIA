# Usando uma imagem base oficial do PHP 8.4 com Apache
FROM php:8.4-apache

# Argumentos para permissões (passados pelo docker-compose)
ARG WWWGROUP
ARG WWWUSER

# Atualiza o sistema e instala dependências essenciais
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    curl \
    npm \
    && docker-php-ext-install pdo pdo_mysql zip mbstring exif pcntl bcmath gd

# Instala o Composer globalmente
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instala Xdebug (se for necessário para debug)
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Configura permissões para o usuário www-data (ou o que passar na variável)
RUN groupmod -g ${WWWGROUP} www-data \
    && usermod -u ${WWWUSER} -g ${WWWGROUP} www-data

# Ativa o mod_rewrite do Apache para Laravel funcionar corretamente
RUN a2enmod rewrite

# Define diretório de trabalho
WORKDIR /var/www/html

# Copia o arquivo de configuração do Apache para rodar Laravel (opcional)
# COPY ./docker/8.4/laravel.conf /etc/apache2/sites-available/000-default.conf

# Expor portas 80 e 5173
EXPOSE 80 5173

# Comando padrão para rodar o npm e o Laravel ao iniciar o container
CMD /bin/bash -c "npm install && npm run dev & php artisan serve --host=0.0.0.0 --port=80"
