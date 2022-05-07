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
    _input = {
      internalType: 'uint256',
      name: 'a',
      type: 'uint256',
    };
    if (to == acct[0]) {
      contract = new web3.Contract(
        [
          {
            inputs: [_input],
            name: 'ownerOf',
            outputs: [
              {
                internalType: 'address',
                name: '',
                type: 'address',
              },
            ],
            type: 'function',
          },
          {
            inputs: [_input],
            name: 'tokenURI',
            outputs: [
              {
                internalType: 'string',
                name: '',
                type: 'string',
              },
            ],
            type: 'function',
          },
        ],
        ca
      );
      ownerof = await contract.methods.ownerOf(id).call();
      if (ownerof.toLowerCase() == acct[0]) {
        tokenuri = formatURL(await contract.methods.tokenURI(id).call());
        if (tokenuri.length > 0) {
          b = await $.getJSON(tokenuri);
          img = formatURL(b.image);
          $('#body').append(
            `<div class="nfts"><b>${na} #${id}</b> - ${b.name}<br><i>${b.description}</i><br><img src="${img}">
            <button>Sell</button></div>`
          );
        }
      }
    }
  }
}
load();
function formatURL(u) {
  if (u.includes('ipfs://') && u.length > 9)
    return u.replace('ipfs://', 'https://ipfs.io/ipfs/');
  else if (
    /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/.test(
      u
    )
  )
    return u;
  else return '';
}
