
import connectDB from '../../app/db/connectDB';
import GorillaTransaction from '../../app/model/gorillaTransaction';

export default async function get(req, res) {
  // Connect to the database
  await connectDB();

  // Check if the request method is GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Fetch all transactions from the database
      const transactions = await GorillaTransaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}