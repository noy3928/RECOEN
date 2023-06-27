import nc from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

const handler = nc<NextApiRequest, NextApiResponse>({
  onError(error, req, res) {
    res.status(400).json({ result: false, message: 'Sorry!' });
  },
  onNoMatch(req, res) {
    res.status(404).json({ result: false, message: 'Not Mached Method!' });
  },
});

handler.post(async (req, res) => {
  const { type, category, _id } = req.body;

  if (req.query.secret !== process.env.NEXT_PUBLIC_NEXTAUTH_SECRET) {
    console.log('revalidate시 토큰이 다릅니다.');
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate(`/${category}`);
    console.log('REVALIDATED ARTICLE LIST PAGE');

    if (type !== 'delete') {
      await res.revalidate(`/${category}/${_id}`);
      console.log('REVALIDATED ARTICLE DETAIL PAGE');
    }

    return res.json({ revalidated: true });
  } catch (err) {
    console.log('Error revalidating', err);
    return res.status(500).send('Error revalidating');
  }
});

export default withSentry(handler);
