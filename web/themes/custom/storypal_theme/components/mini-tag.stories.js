import template from './mini-tag.twig';

import drupalAttribute from "drupal-attribute";
import {genre} from './_mock-data.js';

export default {
  title: "Atom/Mini tag",
};

export const miniTag = () => (
  template({
    attributes: new drupalAttribute(),
    title: genre,
    type: "genre"
  })
);
