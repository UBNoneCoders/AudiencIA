FROM php:8.2-fpm

# Instala extensões PHP e dependências básicas
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd pdo_pgsql

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define diretório de trabalho
WORKDIR /var/www

# Copia arquivos necessários para o Composer
COPY composer.json composer.lock ./

# Instala dependências PHP
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Copia o restante da aplicação
COPY . .

# Garante permissões (caso use cache ou storage)
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

# Expõe a porta
EXPOSE 8000

# Comando para iniciar
CMD php artisan serve --host=0.0.0.0 --port=8000
