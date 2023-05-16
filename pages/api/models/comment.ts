import { Schema, model, models } from 'mongoose';

const commentSchema = new Schema(
  {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const CommentModel = models.Comment || model('comment', commentSchema);

export default CommentModel;
