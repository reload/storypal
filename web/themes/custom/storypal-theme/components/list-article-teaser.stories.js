import drupalAttribute from 'drupal-attribute'

import template from './list-article-teaser.twig';
import {genre, title} from './_mock-data.js';
import miniTagTemplate from "./mini-tag.twig";

export default {
  title: "Molecules/List Article Teaser",
  parameters: {
    design: {
      type: "figma",
      url:
        "",
    },
  },
};

export const listArticleTeaser = () => (
  template({
    attributes: new drupalAttribute(),
    title_attributes: new drupalAttribute(),
    title_prefix: "",
    title_suffix: "",
    title: title,
    url: "#",
    tag:
      miniTagTemplate({
        attributes: new drupalAttribute(),
        title: genre,
        type: "genre",
      })
  })
);
