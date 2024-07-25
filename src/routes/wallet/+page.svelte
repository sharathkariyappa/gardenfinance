<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import web3 from '$lib/web3';
  
    const account = writable(null);
    const balance = writable(null);
    const errorMessage = writable('');
  
    async function connectWallet() {
      try {
        if (web3.currentProvider) {
          const accounts = await web3.eth.requestAccounts();
          account.set(accounts[0]);
          errorMessage.set(''); // Clear any previous error message
          await fetchBalance(accounts[0]); // Fetch balance on connect
        } else {
          errorMessage.set('MetaMask is not installed.');
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        errorMessage.set('Error connecting to MetaMask. Please try again.');
      }
    }
  
    async function fetchBalance(address) {
      try {
        const weiBalance = await web3.eth.getBalance(address);
        const ethBalance = web3.utils.fromWei(weiBalance, 'ether');
        balance.set(ethBalance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        errorMessage.set('Error fetching balance. Please try again.');
      }
    }
  
    onMount(() => {
      if (web3.currentProvider && web3.currentProvider.on) {
        web3.currentProvider.on('accountsChanged', async (accounts) => {
          account.set(accounts[0]);
          await fetchBalance(accounts[0]); // Fetch balance on account change
        });
      }
    });
  </script>
  
  <style>
    .wallet {
      text-align: center;
      margin-top: 50px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    p {
      font-size: 18px;
      font-weight: bold;
    }
    .error {
      color: red;
      font-size: 16px;
      margin-top: 10px;
    }
  </style>
  
  <div class="wallet">
    <button on:click={connectWallet}>Connect to MetaMask</button>
    {#if $account}
      <p>Connected account: {$account}</p>
      <p>Balance: {$balance} ETH</p>
    {/if}
    {#if $errorMessage}
      <p class="error">{$errorMessage}</p>
    {/if}
  </div>
  