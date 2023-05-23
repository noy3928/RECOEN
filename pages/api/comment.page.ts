import { connectMongo } from 'pages/api/middlewares/connectMongo';
import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';
import CommentModel from './models/comment';

const handler = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(400).json({ result: false, message: 'Sorry!' });
  },
  onNoMatch(req, res) {
    res.status(404).json({ result: false, message: 'Not Mached Method!' });
  },
});

handler
  .use(async (req, _, next) => {
    await connectMongo();
    await next();
  })
  .post(async (req, res) => {
    try {
      console.log('CREATING COMMENT');
      console.log(req.body);
      const comment = await CommentModel.create(req.body);
      console.log('CREATED COMMENT');
      res.status(200).json({ comment });
    } catch (err) {
      console.log(err);
    }
  })
  .put(async (req, res) => {
    try {
      console.log('UPDATING COMMENT');
      const body = req.body;
      const id = req.body._id;
      const updateContent = {
        postId: body.postId,
        userId: body.userId,
        content: body.content,
      };

      const comment = await CommentModel.findOneAndUpdate(
        { _id: id },
        updateContent,
      );

      console.log('UPDATED COMMENT');
      res.status(200).json({ comment });
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    try {
      console.log('DELETING COMMENT');
      const id = req.body._id;
      const comment = await CommentModel.findByIdAndDelete(id);

      if (!comment) return res.status(404);
      console.log('DELETED COMMENT');

      res.status(200).json({ comment });
    } catch (err) {
      console.log(err);
    }
  });
export default withSentry(handler);
