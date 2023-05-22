import { axiosInstance } from './index';
import { Comment } from 'src/types/comment';

export function createComment({ postId, userId, content }: Comment) {
  return axiosInstance.post('/api/comment', {
    postId,
    userId,
    content,
  });
}
