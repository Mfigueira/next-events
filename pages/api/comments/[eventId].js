import { httpGetCommentsFromEventById } from '../../../util/helpers';

const handler = async (req, res) => {
  try {
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

      const firebaseResponse = await fetch(
        process.env.COMMENTS_DB_ROUTE.replace('{eventId}', eventId),
        {
          method: 'POST',
          body: JSON.stringify({ email, username, text }),
        }
      );

      if (!firebaseResponse.ok) {
        throw new Error('Could not create message.');
      }

      const data = await firebaseResponse.json();

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
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error has ocurred.' });
  }
};

export default handler;
