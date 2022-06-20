# Hosting

We use **platform.sh** for hosting our site.

When you create a pull-request, it'll make a test-environment for you,
if there is capacity.

When you push to `main`, or merge a pull-request to `main`, **the
changes will be deployed to production.**

## Test branch

In addition to having our `main` environment, we also have a `test`
branch.

Sometimes we may have this environment active on platform.sh, so the
client can test elements already existing in `main`.

The test branch is automatically kept in sync with `main` using [a
github action.](../.github/workflows/test-sync.yml)

