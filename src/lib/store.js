import { writable } from 'svelte/store';

// MetaMask store
export const metaMaskStore = writable({
  metaMaskIsConnected: false,
  connectMetaMask: async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        metaMaskStore.update(store => ({ ...store, metaMaskIsConnected: true }));
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      console.error('MetaMask is not installed.');
    }
  }
});

// Garden store
export const gardenStore = writable({
  garden: null, // Initialize with your Garden instance
  bitcoin: null, // Initialize with your Bitcoin instance
  // Add any other methods or state needed for Garden integration
});

// Sign store
export const signStore = writable({
  isSigned: false,
  setIsSigned: (status) => signStore.update(store => ({ ...store, isSigned: status })),
  setIsMMPopupOpen: (status) => signStore.update(store => ({ ...store, isMMPopupOpen: status })),
  isMMPopupOpen: false,
});
