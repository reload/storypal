# storypal_theme - A custom Drupal theme

## Working with the theme

[You can find the theme files here](../web/themes/custom/storypal_theme)

We're using **npm 9, sass, vanilla JS & twig** to build up the theme.

The assets are built automatically, using the `npm` docker container.

Assuming you've followed the instructions in [how to get the site running in docker](docker.md),
you shouldnt need to do anything yourself.

The files are compiled from /src to /dist.

You can see if the watcher is working using
```shell
docker-compose logs -f npm
```

## Style generation based on reload/daft
**Damn (Awesome) Frontend Tooling**

https://github.com/reload/daft

## Storybook integration

[Storybook is a design-guide tool, for managing UI components, page-layouts in isolation.](https://storybook.js.org/)

It's following the 'atomic design' theory - building components up, which can work in isolation, and be put together to create larger components.

You can start the Storybook using `make storybook` and see it at:

**[http://storypal-storybook.docker/](http://storypal-storybook.docker/)**

**Storybook and the Toybox theme use the same assets**
[You can read about how it's set up in this guide on Medium.com](https://medium.com/@askibinski/integrating-storybook-with-drupal-ddabfc6c2f9d
)

### Example - creating a new component
(`web/themes/custom/storypal_theme`)

You're building a new component named 'Article Teaser'.
First you need to define it in `/components` as a story:

`components/article-teaser.stories.js`

This JS file will refer to a twig file, which you'll also create:

`components/article-teaser.twig`

Then in `templates`, you can define a `.html.twig` as needed, and refer to the `article-teaser.twig` in `components`:

In this example, you'd probably want to target `node--article--teaser.html.twig`:
```
{% include "@storybook/article-teaser.twig" with {
(array of your settings)
} %}
```

Component specific Javascript also lives in the `components` folder:
`/components/js/article-teaser.js` (It's actually a symlink to `/dist/js/components`)

But all our CSS lives in a single file, `/dist/storypal_theme.bundle.css`.

This file is loaded into Storybook and Drupal.
