aa = '0x07b2de1b0d412d567ca4028ab229fd8a671f2491';
async function load(o) {
  if (typeof ethereum != 'undefined')
    acct = await ethereum.request({ method: 'eth_requestAccounts' });
  count = 0;
  web3 = new Web3(ethereum);
  web3 = web3.eth;
  if ((await web3.net.getId()) != 4) {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x4' }],
    });
    location.reload();
  }
  contract = new web3.Contract(
    [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_id',
            type: 'uint256',
          },
        ],
        name: 'Buy',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_contractAddr',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '_tokenId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '_price',
            type: 'uint256',
          },
        ],
        name: 'Sell',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'batch',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'offset',
            type: 'uint256',
          },
        ],
        name: 'Show',
        outputs: [
          {
            internalType: 'string[]',
            name: 'tu',
            type: 'string[]',
          },
          {
            internalType: 'uint256[]',
            name: 'price',
            type: 'uint256[]',
          },
          {
            internalType: 'uint256[]',
            name: 'listId',
            type: 'uint256[]',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    aa
  );
  contract = contract.methods;
  await fetch(
    `https://testnets-api.opensea.io/api/v1/assets?owner=${acct[0]}&order_direction=desc&offset=${o}&limit=50`,
    { method: 'GET' }
  )
    .then((response) => response.json())
    .then((response) => (a = response.assets));
  for (i = 0; i < a.length; i++) {
    $('#body').append(
      `<div class="nfts"><b>${a[i].asset_contract.name}</b> -  ${
        a[i].name
      }<br><i>${a[i].description}</i> ${
        a[i].animation_url == null
          ? `<img src='${a[i].image_url}'>`
          : `<video autoplay muted loop><source src='${a[i].animation_url}'></video>`
      }<p id=p${a[i].id}><input id=t${
        a[i].id
      } placeholder='Price'><button onclick='sell("${
        a[i].asset_contract.address
      }",${a[i].token_id},${a[i].id})'>Sell</button><p></div></div>`
    );
  }
}

async function sell(addr, tokenid, id) {
  contract2 = new web3.Contract(
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'to',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'tokenId',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    addr
  );
  price = $('#t' + id).val();
  $('#p' + id).html('Approving...');
  await contract2.methods.approve(aa, tokenid).send({
    from: acct[0],
    gas: 21e5,
  });
  $('#p' + id).html('Setting price...');
  await contract.Sell(addr, tokenid, price).send({
    from: acct[0],
    gas: 21e5,
  });
  $('#p' + id).html('Listed =)');
}

load(0);
