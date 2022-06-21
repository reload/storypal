import template from './mini-tag.twig';

import drupalAttribute from "drupal-attribute";

export default {
  title: "Atom/Mini tag",
};

export const miniTag = () => (
  template({
    attributes: new drupalAttribute(),
    title: "Podcast",
    type: "genre"
  })
);
