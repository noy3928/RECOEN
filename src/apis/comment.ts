import { axiosInstance } from './index';
import { Comment } from 'src/shared/types/comment';

export function createComment({ postId, userId, content }: Comment) {
  return axiosInstance.post('/api/comment', {
    postId,
    userId,
    content,
  });
}
