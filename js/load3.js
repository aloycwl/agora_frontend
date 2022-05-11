var aa = '0x07b2de1b0d412d567ca4028ab229fd8a671f2491',
  offset = 0;
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
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: '',
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
  a = await contract.methods.show(1, 0).call();
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

load(offset);

$(window).scroll(function () {
  if (
    Math.ceil($(window).scrollTop()) ==
    Math.ceil($(document).height() - $(window).height())
  ) {
    offset += 50;
    load(offset);
  }
});
