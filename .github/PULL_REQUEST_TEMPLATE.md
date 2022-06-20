# For the reviewer

## How-To-Test:

```shell
  platform environment:drush "uli" -e pr-
```

[Write a how-to-test here, that will also be shown to the client]

## JIRA-link:

https://reload.atlassian.net/browse/

## I would like the reviewer to..

- [x] Review the general code
- [x] Run through the how-to-test, like the client will
- [x] Surface-review the unfolded Drupal configuration code
- [ ] Give me feedback/suggestions on a specific problem I have
- [ ] Check the visual differences in Storybook *(Even if I have approved them)*

-----

# For the author:

- [ ] I have considered if these changes should be moved upsteam to reload/storypal

<details>
  <summary>First time request'er? Click here to expand! :book:</summary>

  ## Save the planet :earth_africa: - run your tests locally first :star_struck:

  Github will take care of checking your code - but if you want to save some Github Action cloud resources, you can do these checks locally first:

  ```shell
    git checkout [CURRENT-BRANCH]

    make checks
  ```

  This requires that you have an active docker-environment running - and will check against your `.docker` domain.
</details>
