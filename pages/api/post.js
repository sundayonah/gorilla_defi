import Cors from 'cors';
import connectDB from '../../app/db/connectDB';
import GorillaTransaction from '../../app/model/gorillaTransaction';
import { promisify } from 'util';

// Initialize the cors middleware
const cors = Cors({
  methods: ['POST'], // Allow only POST requests
});

// Helper method to promisify middleware
const corsMiddleware = promisify(cors);

export default async function post(req, res) {
  // Connect to the database
  await connectDB();

  // Apply CORS middleware
  await corsMiddleware(req, res);

  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Create a new transaction
  const { amount, reward, address, timestamp } = req.body;
  const newTransaction = new GorillaTransaction({
    amount,
    reward,
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
