"use client"

import mongoose from 'mongoose';
import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl, Connection, PublicKey, Signer, Transaction, SystemProgram, Keypair } from '@solana/web3.js';
import { toast } from 'react-hot-toast';


// import db from connectDB
// Import dbConnect using require
// const dbConnect = require('@/app/connectDB/db');
// import connectDB from '@/app/api/connectDB/db'
// import GorillaTransaction from '@/app/connectDB/txSchema';
// const GorillaTransaction = require('@/app/connectDB/txSchema')
// import GorillaTransaction from '../model/txSchema';


const Main = () => {
  const { connected, wallet, publicKey, sendTransaction  } = useWallet();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

    const transferSOL = async (amount: number) => {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    if (!connected ||!publicKey) {
        return toast.error("Please Connect Your Wallet!")

    }

    const recipientPublicKey = new PublicKey('HbmpAKG5QiQpvQXKCqR7Mqo3tQz7vztjSfzTCm1GipZK');

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPublicKey,
        lamports: amount,
      })
    );

    try {
      const signature = await sendTransaction(transaction, connection);
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  const handleTransfer = async () => {
    // Check if the wallet is not connected or publicKey is not available
    if (!connected ||!publicKey) {
      toast.error("Please Connect Your Wallet!");
      return; 
    }

    
  // Check if the amount is not provided
  if (!amount) {
    toast.error("Input amount is required!");
    return; 
  }

       setIsLoading(true);
    try {
      const amountInLamports = parseFloat(amount) * 1_000_000_000;
      const transactionResult = await transferSOL(amountInLamports);


        // Create a new transaction object
    const transactionData = {
      amount: amountInLamports,
      address: publicKey.toString(),
      timestamp: new Date().toISOString(),
      };
      console.log(transactionData)
        const url = "http://localhost:3000/api/post";

       // Make a POST request to create a new transaction
       const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    });
      console.log(response)
        if (response.ok) {
      toast.success('Transaction Successful!');
      setAmount('');
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Transaction failed');
    }

      // await transferSOL(amountInLamports);
         toast.success('Transaction Successful!');
      setAmount(''); 
    } catch (error: any) {
      console.error('Transfer failed:', error);
      toast.error('Transfer failed: ' + error.message); 
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    // <div className="w-[30%] mx-auto mt-48">
<div className="container w-full sm:w-[60%] md:w-[60%] lg:w-[30%] mx-auto mt-48 px-4">
      <div className='flex flex-col items-center justify-center space-y-4 p-3 rounded-md shadow-xl border border-gray-100'>

      <h2 className="text-xl font-bold text-[#5c3b12]">Transfer SOL</h2>
        <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in SOL"
        className="w-full shadow-md p-2 rounded focus:outline-none focus:ring-0"
        />
      <button
          onClick={handleTransfer}
          disabled={isLoading}
          className={`w-full ${isLoading ? 'bg-gray-400 cursor-not-allowed py-2 px-4' : 'bg-[#5c3b12] hover:bg-[#5f4627] text-white font-bold py-2 px-4 rounded'}`}
        >
          {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
          </div>
          ) : (
              'Transfer'
            )}
      </button>
        </div>
    </div>
  );
};

export default Main;
