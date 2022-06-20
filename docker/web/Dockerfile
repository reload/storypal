# Base image
FROM reload/drupal-apache-fpm:latest

# This hack is widely applied to avoid python printing issues in docker containers.
# See: https://github.com/Docker-Hub-frolvlad/docker-alpine-python3/pull/13
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install gettext python3.6 python3-pip -y && \
    pip3 install setuptools wheel colorama requests validators beautifulsoup4
