import { ViewArticleElement } from 'src/shared/types/article';

export const getCategory = (list: ViewArticleElement[]) => {
  return list[0].category;
};
