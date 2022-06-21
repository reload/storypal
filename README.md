# Storybook + Drupal = StoryPal

## Drupal boilerplate, for setting up new Reload Drupal sites.

**Powered by:**

- CMS: [Drupal 9+](https://drupal.org)
  - [Gin Admin Theme](https://www.drupal.org/project/gin)
- Hosting: [Platform.sh](https://platform.sh)
- UI component manager: [StoryBook](https://storybook.js.org/)
- Frontend tools: [reload/daft](https://github.com/reload/daft)
- [Github Actions](./github/workflows) for auto-checking pull requests
  - [Chromatic Visual UI Tests](https://www.chromatic.com/)
  - [Drupal Regression](https://github.com/reload/action-drupal-regression) for testing Drupal DOM
  - PHP, SCSS, JS linters and codestyle checkers

## Setting up a new StoryPal-based project

- Go to StoryPal's GitHub page: https://github.com/reload/storypal
- Click "Use this template", where the clone options usually would be
- Run through the checklists below

### Setting up Drupal

- Setup a platform.sh project
  - Guide here: https://reload.atlassian.net/wiki/spaces/RW/pages/341934098/Ops+tning+af+platform.sh
- Install Drupal, on platform
- Setup a db-dump-worker
  - Guide here: https://github.com/reload/db-dump-worker#adding-a-simple-site
  - Trigger a dump straight away: https://github.com/reload/db-dump-worker#i-want-my-data-now
- Update docker-compose.yml to use db-data
- Spin up your local site, [following the quickstart guide](./docs/docker.md)
- Do an initial config export, and put it in a git commit by it's own:

```shell
docker-compose exec web sh -c "drush cex -y"
```

- Enable recommended StoryPal themes and modules:

```shell
docker-compose exec web sh -c "drush en -y storypal_base"
```

```shell
docker-compose exec web sh -c "drush theme-enable -y storypal_theme gin"
```

```shell
docker-compose exec web sh -c "drush config-set system.theme default storypal_theme"
```

```shell
docker-compose exec web sh -c "drush config-set system.theme admin gin"
```

- Export the new changes to config:

```shell
docker-compose exec web sh -c "drush cex -y"
```

- Replace the fallback metatag images.
  - See the files in [/web/themes/custom/storypal_theme/src/images](./web/themes/custom/storypal_theme/src/images)
- Create favicon package
  - Use https://realfavicongenerator.net/ to generate the assets
  - Replace the files in [/web/themes/custom/storypal_theme/favicons](./web/themes/custom/storypal_theme/favicons)

### Setting up Github Actions
- Setup a Chromatic project
  - https://www.chromatic.com/apps
  - Example: https://www.chromatic.com/builds?appId=617bf429e2c8d7003a0ca03e
- Add following Github Actions secrets:
  - CHROMATIC_PROJECT_TOKEN
    - Get this token under "Manage" > "Configure" in Chromatic.com
  - JIRAAPITOKEN
    - ? Where do you get this?
  - GITHUBSECURITYTOKEN
    - ? Where do you get this?
  - DAIS_PLATFORMSH_ID
    - The ID of the platform.sh project
    - BUPL example: odjkvsibijevi
  - DAIS_PLATFORMSH_KEY
    - Login to console.platform.sh as the Reload user
    - "My Profile" > "API Tokens" > "Create API token"
- Also add following Github Dependabot secrets:
  - CHROMATIC_PROJECT_TOKEN
  - DAIS_PLATFORMSH_ID
  - DAIS_PLATFORMSH_KEY

### Tweaking documentation
- Update this README file to match your project
  - You can take inspiration from [README-PROJECT-EXAMPLE.md](./README-PROJECT-EXAMPLE.md)
  - Remember to use [./docs](./docs) when it makes sense
- Create an [Atlassian Compass](https://reload.atlassian.net/compass/) space for this project
  - Add links to Jira, Zulip etc. in the Compass space
  - Code-based documentation stays in the Github Repo.
