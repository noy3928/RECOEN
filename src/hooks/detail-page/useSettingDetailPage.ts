import { ViewArticleElement } from 'src/shared/types/article';
import { useSetDetailPageState } from './useSetDetailPageState';
import { useResetDetailPageState } from './useResetDetailPageState';

export const useSettingDetailPage = (article: ViewArticleElement) => {
  useSetDetailPageState(article);
  useResetDetailPageState();
};
