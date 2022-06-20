# Docker (local environment)

## First time setup

Run `make reset` from the root of the project.

This is also how you reset your local environment, such as when you're switching to a different `git` branch.

The script will end with a message on how to access the site.

### MacOS

If you're using MacOS + Docker for Mac, it's recommended to use NFS.

You need to run this:

```shell
cp docker-compose.mac-nfs.yml docker-compose.override.yml
```

And then read about the NFS setup here:

https://reload.atlassian.net/wiki/spaces/RW/pages/153288705/Docker+for+Mac
