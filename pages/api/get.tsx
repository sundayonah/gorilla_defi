
// import connectDB from '../../app/db/connectDB';
// import GorillaTransaction from '../../app/model/gorillaTransaction';
// import Cors from 'cors';




// // // Create a new instance of the cors middleware
// // const corsHandler = Cors({
// // //   origin: 'https://gorilla-defi.vercel.app', // Specify the origin of your frontend
// //   origin: 'http://localhost:3000', // Specify the origin of your frontend
// //   methods: ['GET'], // Specify the allowed methods
// // });

// export default async function get(req, res) {
//   // Use the corsHandler middleware
// //   await corsHandler(req, res);

//   // Connect to the database
//   await connectDB();

//   // Check if the request method is GET
//   if (req.method !== 'GET') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   try {
//     // Fetch all transactions from the database
//       const transactions = await GorillaTransaction.find();
//     res.status(200).json(transactions);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }


import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

// Function to fetch and display user's total amount and reward
export default async function get(req: NextApiRequest, res: NextApiResponse) {
  if (req.method!== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

const client = new MongoClient(process.env.MONGODB_CONNECT || "your_default_connection_string", { serverSelectionTimeoutMS: 30000 });

  try {
    // Connect to MongoDB
    await client.connect();
    const db = client.db('gorilla-sol');
    const collection = db.collection('transactions');

    // Fetch the user's transactions
    const transactions = await collection.find().toArray(); // Convert cursor to array

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Ensure the MongoDB client is closed after the operation
    await client.close();
  }
}