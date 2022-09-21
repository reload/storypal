import template from '../templates/mini-tag.twig';

import drupalAttribute from "drupal-attribute";
import {genre} from '../assets/_mock-data.js';

export default {
  title: "Atoms/Mini-tag",
};

export const miniTag = () => (
  template({
    attributes: new drupalAttribute(),
    title: genre,
    type: "genre"
  })
);
