# Usando imagem oficial do PHP 8.4 com Apache
FROM php:8.4-apache

# Argumentos para usuário e grupo
ARG WWWUSER=1000
ARG WWWGROUP=1000

# Atualiza e instala dependências essenciais
RUN apt-get update && apt-get install -y \
    git unzip zip libzip-dev libpng-dev libonig-dev libxml2-dev curl npm \
    && docker-php-ext-install pdo pdo_mysql zip mbstring exif pcntl bcmath gd

# Instala Composer globalmente
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Instala Xdebug se quiser debug (pode remover se não usar)
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Ajusta permissões para usuário www-data (pode passar via build args)
RUN groupmod -g ${WWWGROUP} www-data \
    && usermod -u ${WWWUSER} -g ${WWWGROUP} www-data

# Ativa mod_rewrite do Apache para Laravel
RUN a2enmod rewrite

# Define diretório de trabalho padrão
WORKDIR /var/www/html

# Expõe portas HTTP e Vite
EXPOSE 80 5173

# Comando padrão para rodar o Apache em foreground
CMD ["apache2-foreground"]
