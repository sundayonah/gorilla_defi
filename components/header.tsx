"use client"

import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Header = () => {
    const { connected, connect, disconnect } = useWallet();
const WalletMultiButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
    { ssr: false }
);


  return (
    <div className="fixed top-0 left-0 right-0 z-10 max-w-5xl mx-auto px-5 p-2 my-8 rounded-xl shadow-lg bg-white ">
      <div className="flex justify-between items-center">
        <Image src="/gorila.webp" width={40} height={40} alt='logo' />
             <div className="">
            <WalletMultiButtonDynamic  />
            </div>

      </div>
    </div>
  );
};

export default Header;
