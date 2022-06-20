// Defining common components, used in our different page types.
import drupalAttribute from "drupal-attribute";

import { ArticleList } from "./article-list.stories";

export const articleTemplateOptions = {
  attributes: new drupalAttribute(),
  header: [],
  content: [
    ArticleList,
  ],
  bundle: "article",
};
