FROM serversideup/php:8.2-fpm-nginx

# Change web root to Laravel's public directory
ENV WEB_DOCUMENT_ROOT=/var/www/html/public

# Copy the backend files with correct ownership
COPY --chown=www-data:www-data backend/ /var/www/html/

# Install composer dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

