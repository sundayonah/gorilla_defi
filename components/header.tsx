"use client"

// import React, { useState } from 'react';
// import { useWallet } from '@solana/wallet-adapter-react';
// import { TonConnectButton } from '@tonconnect/ui-react';
// import dynamic from 'next/dynamic';
// import Image from 'next/image';

// const Header = () => {
//     const { connected, connect, disconnect } = useWallet();
//     const WalletMultiButtonDynamic = dynamic(
//         async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
//         { ssr: false }
//     );

//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     return (
//         <div className="fixed top-0 left-0 right-0 z-10 max-w-5xl mx-auto px-5 p-2 my-8 rounded-xl shadow-lg bg-white ">
//             <div className="flex justify-between items-center">
//                 <Image src="/gorila.webp" width={40} height={40} alt="logo" />
//                 <div className="">
//                     <button onClick={openModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                         Connect Wallet
//                     </button>
//                 </div>
//             </div>
//             {isModalOpen && (
//                 <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-8 rounded-lg">
//                         <h2 className="text-lg font-bold mb-4">Select Wallet</h2>
//                         <div className="flex justify-center items-center flex-col space-x-4 space-y-4">
//                             <WalletMultiButtonDynamic />
//                             <TonConnectButton />
//               </div>
//               <div className='flex  justify-end'>
//                         <button onClick={closeModal} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                             Close
//                         </button>
//               </div>
//               </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Header;

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
// import { TonConnectButton } from '@tonconnect/ui-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// // Define an interface for the props
// interface HeaderProps {
//   setSelectedNetwork: (network: string) => void; // Assuming setSelectedNetwork takes a string
// }

const Header = () => {
    const { connected, connect, disconnect } = useWallet();
    const WalletMultiButtonDynamic = dynamic(
        async () => (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
        { ssr: false }
    );

    // const [showModal, setShowModal] = useState(false);
    // const [selectedWallet, setSelectedWallet] = useState('');

    // const selectNetwork = (network: string) => {
    //   setSelectedNetwork(network);
    //   setSelectedWallet(network);
    //   setShowModal(false);
    // };

    // useEffect(() => {
    //     if (connected) {
    //       setSelectedWallet('SOL'); // Assuming SOL is the default wallet
    //     }
    // }, [connected]);

    return (
        <div className="fixed top-0 left-0 right-0 z-10 max-w-5xl mx-auto px-5 p-2 my-8 rounded-xl shadow-lg bg-white ">
            <div className="flex justify-between items-center">
                <Image src="/gorila.webp" width={40} height={40} alt="logo" />
                {/* <div className="">
                    {!selectedWallet ? (
                        <button onClick={() => setShowModal(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Connect Wallet
                        </button>
                    ) : (
                     <>
                <div onClick={() => selectNetwork('TON')}>
                    <TonConnectButton />
                </div>
                <WalletMultiButtonDynamic onClick={() => selectNetwork('SOL')} />
              </>
                    )} */}
                                <WalletMultiButtonDynamic />
                    {/* <Modal show={showModal} onClose={() => setShowModal(false)}>
                        <div className="p-4">
                            <div className="mb-4">
                                <h2 className="text-lg font-semibold">Select Wallet</h2>
                            </div>
                            <div className="flex justify-center items-center flex-col space-x-4 space-y-4">
                                <div onClick={() => selectNetwork('TON')}>
                                <TonConnectButton />
                          </div>
                            </div>
                        </div>
                    </Modal> */}
                </div>
            </div>
    );
};

// const Modal = ({ show, onClose, children }:ModalProps) => {
//     if (!show) return null;

//     return (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg shadow-xl">
//                 {children}
//              <div className='flex  justify-end'>
//                        <button onClick={onClose} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                            Close
//                        </button>
//                </div>
//             </div>
//         </div>
//     );
// };

export default Header;