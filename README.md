# Storybook + Drupal = StoryPal

## Drupal boilerplate, for setting up new Reload Drupal sites.

**Powered by:**

- CMS: [Drupal 9+](https://drupal.org)
  - [Gin Admin Theme](https://www.drupal.org/project/gin)
- Hosting: [Platform.sh](https://platform.sh)
- UI component manager: [StoryBook](https://storybook.js.org/)
- Frontend tools: [reload/daft](https://github.com/reload/daft)
- [GitHub Actions](./github/workflows) for auto-checking pull requests
  - [Chromatic Visual UI Tests](https://www.chromatic.com/)
  - [Drupal Regression](https://github.com/reload/action-drupal-regression) for testing Drupal DOM
  - PHP, SCSS, JS linters and codestyle checkers

## Setting up a new StoryPal-based project

- Go to StoryPal's GitHub page: [https://github.com/reload/storypal](https://github.com/reload/storypal)
- Click "Use this template", where the clone options usually would be
- Run through the checklists below

### Setting up Drupal

- Setup a platform.sh project
  - Guide here: [https://reload.atlassian.net/wiki/spaces/RW/pages/341934098/Ops+tning+af+platform.sh](https://reload.atlassian.net/wiki/spaces/RW/pages/341934098/Ops+tning+af+platform.sh)

#### OPTION 1 (RECOMMENDED): Using the pre-made installation

StoryPal also has it's own Platform.sh project, with a basic Drupal installation.
You could take the database from this project, and build from that.

That means you'll have to be added to the StoryPal project, so you can export the database using:

```
platform db:dump -e main -p ppobdkgor7fo6 -d ./
```

#### OPTION 2 (ALTERNATIVE): Create your own installation

- Once you've set up your own project, you can setup Drupal through the web interface
- Export the database from the project, for use in local docker
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


### Setting up dump-worker

- Guide here: [https://github.com/reload/db-dump-worker#adding-a-simple-site](https://github.com/reload/db-dump-worker#adding-a-simple-site)
- Trigger a dump straight away ("I want my data straight away!" in the README)
- Update docker-compose.yml to use db-data, with the correct image.

### Creating your own theme

- Dont use Storypal as a base theme - just add your changes directly in the theme, otherwise Storybook wont work.
- Replace the fallback metatag images.
  - See the files in [/web/themes/custom/storypal_theme/src/images](./web/themes/custom/storypal_theme/src/images)
- Create favicon package
  - Use [https://realfavicongenerator.net/](https://realfavicongenerator.net/) to generate the assets
  - Replace the files in [/web/themes/custom/storypal_theme/favicons](./web/themes/custom/storypal_theme/favicons)

### Setting up GitHub Actions
- Setup a Chromatic project
  - [https://www.chromatic.com/apps](https://www.chromatic.com/apps)
  - Example: [https://www.chromatic.com/builds?appId=617bf429e2c8d7003a0ca03e](https://www.chromatic.com/builds?appId=617bf429e2c8d7003a0ca03e)
- Add following GitHub Actions secrets:
  - `CHROMATIC_PROJECT_TOKEN`
    - Get this token under "Manage" > "Configure" in [Chromatic.com](https://chromatic.com)
  - `DAIS_PLATFORMSH_ID`
    - The ID of the platform.sh project
    - Storypal example: `ppobdkgor7fo6`
  - `DAIS_PLATFORMSH_KEY`
    - Login to [console.platform.sh](https://console.platform.sh) as the Reload user
    - "My Profile" > "API Tokens" > "Create API token"
  - `JIRAAPITOKEN`
  - `GITHUBSECURITYTOKEN`

- **Also add following GitHub Dependabot secrets:**
  - `CHROMATIC_PROJECT_TOKEN`
  - `DAIS_PLATFORMSH_ID`
  - `DAIS_PLATFORMSH_KEY`
- Add `PLATFORMSH_ID` in [./.github/workflows/drupal-regression.yml](./.github/workflows/drupal-regression.yml)
  - Same value as you used in `DAIS_PLATFORMSH_ID`

### Tweaking documentation
- Update this README file to match your project
  - You can take inspiration from [README-PROJECT-EXAMPLE.md](./README-PROJECT-EXAMPLE.md)
  - Remember to use [./docs](./docs) when it makes sense
- Create an [Atlassian Compass](https://reload.atlassian.net/compass/) space for this project
  - Add links to Jira, Zulip etc. in the Compass space
  - Code-based documentation stays in the GitHub Repo.
