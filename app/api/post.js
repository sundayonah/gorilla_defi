

import connectDB from '../../db/connectDB';
import GorillaTransaction from '../../model/gorillaTransaction';

export default async function post(req, res) {
  // Connect to the database
  await connectDB();

  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Create a new transaction
  const { amount, address, timestamp } = req.body;
  const newTransaction = new GorillaTransaction({
    amount,
    address,
    timestamp,
  });
  console.log(newTransaction)

  try {
    // Save the transaction to the database
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

