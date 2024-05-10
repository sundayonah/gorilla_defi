"use client"

import mongoose from 'mongoose';
import React, { useEffect, useState } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl, Connection, PublicKey, Signer,LAMPORTS_PER_SOL, Transaction, SystemProgram, Keypair } from '@solana/web3.js';
import { toast } from 'react-hot-toast';
import { TransactionReward } from '@/app/interfaces';


const Main = () => {
  const { connected, wallet, publicKey, sendTransaction  } = useWallet();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionReward[]>([]);

  const connectedUserAddress = publicKey?.toString()

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
    // return { success: true, amount }; // Return the amount transferred upon success
    return true // Return the amount transferred upon success
  } catch (error) {
    console.error('Transfer failed:', error);
    return false; // Indicate failure if there's an error
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
    
    // Validate the amount between 0.1 SOL and 5 SOL
    const minAmount = 0.1 * 1_000_000_000; // 0.1 SOL in lamports
    const maxAmount = 5 * 1_000_000_000; // 5 SOL in lamports
    const amountInLamports = parseFloat(amount) * 1_000_000_000;

    if (amountInLamports < minAmount || amountInLamports > maxAmount) {
      toast.error("Amount must be between 0.1 SOL and 5 SOL.");
      return;
    }

       setIsLoading(true);
   setIsLoading(true);
  try {
    const transferResult = await transferSOL(amountInLamports);
    // Perform a type check before accessing the 'success' and 'amount' properties
      if (transferResult) {
        let reward = 0;
        if (amountInLamports >= 2_000_000_000) { // 5 SOL in lamports
          reward = amountInLamports * 2; // Multiply the amount by 2 if it's 5 SOL or more
        }

        // Create a new transaction object
        const transactionData = {
          amount: amountInLamports, // Use the amount from the transferResult
          reward: reward,
          address: publicKey.toString(),
          timestamp: new Date().toISOString(),
        };

        // const url = "http://localhost:3000/api/post";
          const url = "https://gorilla-defi.vercel.app/api/post";


        // Make a POST request to create a new transaction
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(transactionData),
        });

        if (response.ok) {
          toast.success('Transaction Successful!');
          setAmount('');
        window.location.reload()
        } else {
          const errorData = await response.json();
          toast.error('Transfer failed: ');

          throw new Error(errorData.error || 'Transaction failed');
        }
      } else {
        toast.error('Transfer failed: ');
      }

  } catch (error: any) {
    console.error('Transfer failed:', error);
    toast.error('Transfer failed: ');
  } finally {
    setIsLoading(false);
  }
  };
  
  
    useEffect(() => {
      const fetchTransactions = async () => {
        // const url = "http://localhost:3000/api/get";
            const url = "https://gorilla-defi.vercel.app/api/get";

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        const filteredTransactions = data.filter((transaction: TransactionReward) => transaction.address === connectedUserAddress);
        setTransactions(filteredTransactions);
      } catch (error) {
        // setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [connectedUserAddress]);

// 19000000000
  return (
<div className="container w-full sm:w-[60%] md:w-[60%] lg:w-[30%] mx-auto mt-48 px-4">
      <div className='flex flex-col items-center justify-center space-y-4 p-3 rounded-md shadow-xl border border-gray-100'>

      <h2 className="text-xl font-bold text-[#5c3b12]">Invest SOL</h2>
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
              'Deposit'
            )}
      </button>
      </div>
      
      <div className='mt-5'>

      {transactions.map((tx) => (
        <div key={tx._id} className='text-[#5c3b12]'>
          <div className='space-x-2'>
          <span className='text-xl font-bold '>Total Amount Deposited:</span>
          <span>${(tx?.amount || 0) / LAMPORTS_PER_SOL} SOL</span> <br />
          </div>
          <div className='space-x-2'>
          <span className='text-xl font-bold '>Rewads:</span>
          <span>${(tx?.reward || 0) / LAMPORTS_PER_SOL} Gorilla</span>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Main;
