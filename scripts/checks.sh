#!/usr/bin/env bash

##
# Running all the checks that Github Actions run, locally.

set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# shellcheck source=_common.sh
source "${SCRIPT_DIR}/_common.sh"

if [[ ! $(docker-compose ps --services --filter "status=running") ]]; then
  echoc "Docker does not seem to be running."
  echoc "Just commit your changes, and Github Actions will check it for you."
  exit 1
fi

echoc "Running frontend checks.."

docker-compose exec node sh -c  "\
    cd /var/www \
    && echo ' * Auto-linting with 'npm run format'' \
    && npm run format \
    && echo ' * Checking code-style..' \
    && npm run lint \
  "

echoc "Running PHP/Drupal checks.."

docker-compose exec fpm sh -c  "\
    cd /var/www \
    && echo ' * Updating and validating composer.lock..' \
    && composer update --lock --quiet \
    && echo ' * Running PHPStan..' \
    && phpstan \
    && echo ' * Running PHPCS..' \
    && vendor/bin/phpcs --report=checkstyle \
  "

echoc "Running Web checks.."

git status

echoc "I'm still here, so everything went good!"
