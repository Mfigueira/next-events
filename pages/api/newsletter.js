const handler = async (req, res) => {
  try {
    if (req.method === 'POST') {
      const { email } = req.body;

      if (!email || email.trim() === '' || !email.includes('@')) {
        res.status(422).json({ message: 'Invalid email address.' });
        return;
      }

      const firebaseResponse = await fetch(process.env.NEWSLETTER_DB_ROUTE, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });

      if (!firebaseResponse.ok) {
        throw new Error('Could not register to newsletter.');
      }

      res.status(201).json({ message: 'Registered in Newsletter!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'An error has ocurred.' });
  }
};

export default handler;
