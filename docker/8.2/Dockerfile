FROM php:8.2-fpm

# Instalar dependências e extensões necessárias
RUN apt-get update && apt-get install -y \
    libpq-dev zip unzip curl git \
    && docker-php-ext-install pdo pdo_pgsql zip

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copiar arquivos da aplicação para dentro do container
COPY . .

# Instalar dependências PHP (produção)
RUN composer install --no-dev --optimize-autoloader

# Ajustar permissões para o usuário do PHP
RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000

CMD ["php-fpm"]