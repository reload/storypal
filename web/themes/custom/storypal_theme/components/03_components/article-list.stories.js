import drupalAttribute from 'drupal-attribute'

import template from '../templates/article-list.twig';

import {listArticleTeaser} from '../02_molecules/list-article-teaser.stories.js';

export default {
  title: "Components/Article List",
  parameters: {
    design: {
      type: "figma",
      url:
        "",
    },
  },
};

export const ArticleList = () => (
  template({
    attributes: new drupalAttribute(),
    title: "An article list",
    teasers: [listArticleTeaser, listArticleTeaser, listArticleTeaser, listArticleTeaser],
  })
);
