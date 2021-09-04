import { httpGetCommentsFromEventById } from '../../../util/helpers';

const handler = async (req, res) => {
  const { eventId } = req.query;

  if (req.method === 'POST') {
    const { email, username, text } = req.body;

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') ||
      !username ||
      username.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const fbRes = await fetch(
      process.env.NEXT_PUBLIC_COMMENTS_DB_ROUTE.replace('{eventId}', eventId),
      {
        method: 'POST',
        body: JSON.stringify({ email, username, text }),
      }
    );
    const data = await fbRes.json();

    const comment = {
      id: data.name,
      email,
      username,
      text,
    };

    res.status(201).json({ message: 'Comment Added!', comment });
  }

  if (req.method === 'GET') {
    const comments = await httpGetCommentsFromEventById(eventId);

    res.status(200).json({ message: 'Fetched Comments', comments });
  }
};

export default handler;
