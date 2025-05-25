# Imagem base com PHP + extensões necessárias
FROM php:8.2-fpm

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
  git \
  curl \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  zip \
  unzip

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define diretório de trabalho
WORKDIR /var/www

# Copia os arquivos da aplicação
COPY . .

# Instala dependências do Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Expõe a porta 8000
EXPOSE 8000

# Comando padrão ao subir o container
CMD php artisan serve --host=0.0.0.0 --port=8000
