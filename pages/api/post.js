// import Cors from 'cors';
// import connectDB from '../../app/db/connectDB';
// import GorillaTransaction from '../../app/model/gorillaTransaction';
// import { promisify } from 'util';

// // Initialize the cors middleware
// const cors = Cors({
//   methods: ['POST'], // Allow only POST requests
// });

// // Helper method to promisify middleware
// const corsMiddleware = promisify(cors);

// export default async function post(req, res) {
//   // Connect to the database
//   await connectDB();

//   // Apply CORS middleware
//   await corsMiddleware(req, res);

//   // Check if the request method is POST
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   // Create a new transaction
//   const { amount, reward, address, timestamp } = req.body;
//   const newTransaction = new GorillaTransaction({
//     amount,
//     reward,
//     address,
//     timestamp,
//   });

//   console.log(newTransaction)

//   try {
//     // Save the transaction to the database
//     const savedTransaction = await newTransaction.save();
//     res.status(201).json(savedTransaction);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


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
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract data from the request body
  const { amount, reward, address, timestamp } = req.body;
  try {
    // Check if the address already exists
    const existingTransaction = await GorillaTransaction.findOne({ address });
    if (existingTransaction) {

        const newTotalAmount = existingTransaction.amount + amount;

      // Calculate the new reward based on the new amount
      let newReward = 0;
      if (newTotalAmount >= 2_000_000_000) { // 2 SOL in lamports
        newReward = newTotalAmount * 2; // Multiply the amount by 2 if it's 2 SOL or more
      }

      console.log(newReward);

      // If the address exists, update the existing record
      existingTransaction.amount += amount;
      existingTransaction.reward += newReward;
      existingTransaction.timestamp = timestamp; // Update the timestamp if needed
      await existingTransaction.save();
      res.status(200).json(existingTransaction);
    } else {
      // If the address does not exist, create a new record
      const newTransaction = new GorillaTransaction({
        amount,
        reward,
        address,
        timestamp,
      });
      // Save the new transaction record to the database
      const savedTransaction = await newTransaction.save();
      res.status(201).json(savedTransaction);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}