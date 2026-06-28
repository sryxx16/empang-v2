#!/bin/bash

# Clear Laravel caches just in case
php artisan config:clear
php artisan cache:clear

# Run migrations (Optional: uncomment if you want automatic migrations on deploy)
# php artisan migrate --force

# Start PHP-FPM in background
php-fpm &

# Start Nginx in foreground so container stays alive
nginx -g "daemon off;"
