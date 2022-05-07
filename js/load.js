async function load() {
  a = await $.getJSON(
    'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=0x15eD406870dB283E810D5885e432d315C94DD0dd&startblock=0&endblock=999999999&sort=desc&apikey=561643C1V7AJIMWFSBUYGWE8WG3NDVHS67'
  );
  if (typeof ethereum != 'undefined')
    acct = await ethereum.request({ method: 'eth_requestAccounts' });
  count = 0;
  web3 = new Web3(ethereum);
  web3 = web3.eth;
  for (i = 0; i < a.result.length; i++) {
    ca = a.result[i].contractAddress;
    to = a.result[i].to;
    id = a.result[i].tokenID;
    na = a.result[i].tokenName;
    if (to == acct[0]) {
      contract = new web3.Contract(
        [
          {
            inputs: [
              {
                internalType: 'uint256',
                name: 'a',
                type: 'uint256',
              },
            ],
            name: 'ownerOf',
            outputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
              },
            ],
            name: 'tokenURI',
            outputs: [
              {
                internalType: 'string',
                name: '',
                type: 'string',
              },
            ],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        ca
      );
      ownerof = await contract.methods.ownerOf(id).call();
      if (ownerof.toLowerCase() == acct[0]) {
        tokenuri = await contract.methods.tokenURI(id).call();
        passed = 0;
        re =
          /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;
        if (tokenuri.includes('ipfs://')) {
          tokenuri.replace('ipfs://', 'https://ipfs.io/ipfs/');
          passed = 1;
        } else if (re.test(tokenuri)) passed = 1;
        $('#body').append(`${na}, ${tokenuri}, passed: ${passed}<br>`);
      }
    }
  }
}
load();
