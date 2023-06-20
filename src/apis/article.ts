import { axiosInstance } from './index';
import { ArticleElement, ArticleCategory } from 'src/types/article';
import { API_URI } from '../shared/constants';

export const createArticle = async (data: ArticleElement) => {
  return await axiosInstance.post(API_URI.ARTICLE_URI, data);
};

export const updateArticle = async (data: ArticleElement) => {
  return await axiosInstance.put(API_URI.ARTICLE_URI, data);
};

export const deleteArticle = async (id: string, category: ArticleCategory) => {
  const config = { data: { id, category } };
  return await axiosInstance.delete(API_URI.ARTICLE_URI, config);
};

export const revalidateArticle = async (data: ArticleElement) => {
  return await axiosInstance.post(
    `${API_URI.REVALIDATE_URI}${process.env.NEXT_PUBLIC_NEXTAUTH_SECRET}`,
    data,
  );
};
