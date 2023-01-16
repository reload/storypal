#!/usr/bin/env bash

##
# Removes all containers and starts up a clean environment
#
# Invokes site-reset.sh after container startup.

set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# shellcheck source=_common.sh
source "${SCRIPT_DIR}/_common.sh"

# Hostname to send a request to to warm up the cache-cleared site.
HOST="localhost"
WEB_CONTAINER="web"

# Start off at the root of the project.
cd "$SCRIPT_DIR/../"

if [[ $DORY ]]; then
    dory up
fi

(docker-compose down --remove-orphans || true)
(docker-compose down --volumes || true)

# Start up containers in the background and continue immediately
echoc "*** Starting new containers"

docker-compose up --build -d --remove-orphans

# Perform the drupal-specific reset
echoc "*** Resetting Drupal"
"${SCRIPT_DIR}/site-reset.sh"

echo "=================="

echoc "The site is now available at"
echo "https://$PROJECT_NAME.docker"

echoc "ADMIN login:"
docker-compose exec fpm drush uli

echo "=================="

echoc "You can start the Storybook by running:"
echo "make storybook"
echoc "..and visit the Storybook site here:"
echo "http://$PROJECT_NAME-storybook.docker/"
