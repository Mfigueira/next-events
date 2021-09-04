const handler = (req, res) => {
  if (req.method === 'GET') {
    console.log('req.body :>> ', req.body);

    res.status(200).json({ message: 'Fetched Comments' });
  }
};

export default handler;
