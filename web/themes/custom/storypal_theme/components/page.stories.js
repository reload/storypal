import template from './page.twig';
import { ArticleList } from "./article-list.stories";

export default {
  title: "Pages/Pages",
  parameters: {
    layout: "fullscreen",
    chromatic: { viewports: [320, 768, 1200] },
  },
};

export const article = () => (
  template({
    attributes: new drupalAttribute(),
    header: [],
    content: [
      ArticleList,
    ],
    bundle: "article",
  })
);
