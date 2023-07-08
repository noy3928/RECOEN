import { useRecoilValue } from 'recoil';
import { articleState, writeStatus } from 'src/recoil/article';

import { SaveArticleFunction, ArticleElement } from 'src/shared/types/article';
import { createArticle, updateArticle } from 'src/apis';
import { useHandleSuccess } from './useHandleSuccess';

export const useResolveSaveArticleHandler = () => {
  const articleElements = useRecoilValue(articleState);
  const handleSuccess = useHandleSuccess();
  const writeState = useRecoilValue(writeStatus);

  const makeSaveArticleHandler =
    (
      articleElements: ArticleElement,
      handleSuccess: (article: ArticleElement) => void,
    ) =>
    async (saveArticleFunction: SaveArticleFunction) => {
      const res = await saveArticleFunction(articleElements);

      if (res.status == 200) {
        console.log('creating article success');
        handleSuccess(res.data.article);
      }
    };

  const handleSaveArticle = makeSaveArticleHandler(
    articleElements,
    handleSuccess,
  );

  const handleArticleSave = () => {
    if (writeState === 'create') return handleSaveArticle(createArticle);
    if (writeState === 'update') return handleSaveArticle(updateArticle);
  };

  return handleArticleSave;
};
