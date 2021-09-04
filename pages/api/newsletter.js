const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || email.trim() === '' || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    await fetch(process.env.NEXT_PUBLIC_NEWSLETTER_DB_ROUTE, {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    res.status(201).json({ message: 'Registered in Newsletter!' });
  }
};

export default handler;