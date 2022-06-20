#!/usr/bin/env bash

##
# Prepares a site for development.
#
# The assumption is that we're bootstrapping with a database-dump from
# another environment, and need to run updb and import configuration
# using drush deploy.

set -euo pipefail

IFS=$'\n\t'
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
FILES=web/sites/default/files

# Chmod to 777 if the file is not owned by www-data
cd "${SCRIPT_DIR}/../"
mkdir -p "${FILES}"

docker-compose exec fpm sh -c "find '/var/www/${FILES}' \! -uid 33  \! -print0 -name .gitkeep | xargs -0 chmod 777"

time docker-compose exec fpm sh -c  "\
  echo ' * Waiting php container to be ready' \
  && wait-for-it -t 100 localhost:9000 \
  && echo ' * Waiting for the database to be available' \
  && wait-for-it -t 100 db:3306 \
  && git config --global --add safe.directory '*' \
  && echo 'composer installing' \
  && git config --global --add safe.directory '*' \
  && cd /var/www && /usr/bin/composer install && cd /var/www/web \
  echo 'Setting up packages' && \

  echo 'Site reset' && \
  echo ' * Run drush deploy' && \
  drush -y deploy && \
  echo ' * Importing custom translations.' && \
  drush locale-import da modules/custom/storypal_base/translations/da.po
  "
