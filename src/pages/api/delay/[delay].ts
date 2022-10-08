import { clamp } from '@luxass/luxals';
import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const { delay, url } = req.query;
  const delayMs = Number(Array.isArray(delay) ? delay[0] : delay);
  const redirectUrl = Array.isArray(url) ? url[0] : url;
  if (isNaN(delayMs) || !redirectUrl) {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }

  if (delayMs > 10000) {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }

  // simulate a slow request
  setTimeout(() => {
    console.log('Redirecting to', redirectUrl);
    res.setHeader('Location', redirectUrl);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(302).end();
  }, clamp(delayMs, 0, 10000));
}
