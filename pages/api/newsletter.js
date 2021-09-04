const handler = (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    console.log('Email :>> ', email);

    res.status(201).json({ message: 'Registered in Newsletter!' });
  }
};

export default handler;
