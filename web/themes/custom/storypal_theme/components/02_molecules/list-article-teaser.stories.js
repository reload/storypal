import drupalAttribute from 'drupal-attribute'

import template from '../templates/list-article-teaser.twig';
import miniTagTemplate from "../templates/mini-tag.twig";
import {genre, title} from '../assets/_mock-data.js';

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
