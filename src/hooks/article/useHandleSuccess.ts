import { useResetRecoilState } from 'recoil';
import { useRouter } from 'next/router';

import { articleState } from 'src/recoil/article';
import { modalState } from 'src/recoil/modal';

import { ArticleElement } from 'src/shared/types/article';
import { revalidateArticle } from 'src/apis';

export const useHandleSuccess = () => {
  const resetArticle = useResetRecoilState(articleState);
  const resetModalState = useResetRecoilState(modalState);

  const router = useRouter();

  return async (article: ArticleElement) => {
    try {
      console.log('success action start');
      await revalidateArticle(article);
      router.push(`/${article.category}`);
      resetArticle();
      resetModalState();
    } catch (err) {
      console.log(err);
    }
  };
};
