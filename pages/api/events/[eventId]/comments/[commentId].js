const handler = (req, res) => {
  if (req.method === 'POST') {
    console.log('req.body :>> ', req.body);

    res.status(201).json({ message: 'Comment Added' });
  }
};

export default handler;
