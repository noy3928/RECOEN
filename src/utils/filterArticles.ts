import curry from 'ramda/src/curry';
import includes from 'ramda/src/includes';
import filter from 'ramda/src/filter';
import { ViewArticleElement } from 'src/shared/types/article';

export const filterArticles = curry(
  (articles: ViewArticleElement[], selectedTag: string) =>
    filter((article) => includes(selectedTag, article.tags), articles),
);
