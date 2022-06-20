#!/usr/bin/env bash

##
# Common utilities for the docker shell-scripts.

set -euo pipefail
IFS=$'\n\t'

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

PROJECT_NAME=storypal

# Conditional include of .env.
if [[ -f "${SCRIPT_DIR}/../.env" ]]; then
    # shellcheck source=../../.env disable=SC1091
    source "${SCRIPT_DIR}/../.env"
fi

# Determine if we have Dory DNS
DORY=
if [[ $(type -P "dory") ]]; then
    DORY=1
fi

# Echo green
echoc () {
    GREEN=$(tput setaf 2)
    RESET=$(tput sgr0)
	echo -e "${GREEN}$1${RESET}"
}
