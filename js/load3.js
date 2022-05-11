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
  u = {
    internalType: 'uint256',
    name: '',
    type: 'uint256',
  };
  ad = {
    internalType: 'address',
    name: '',
    type: 'address',
  };
  ua = {
    internalType: 'uint256[]',
    name: '',
    type: 'uint256[]',
  };
  sa = {
    internalType: 'string[]',
    name: '',
    type: 'string[]',
  };
  contract = new web3.Contract(
    [
      {
        inputs: [u],
        name: 'Buy',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
      {
        inputs: [ad, u, u],
        name: 'Sell',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [u, u],
        name: 'Show',
        outputs: [sa, ua, ua],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    aa
  );
  contract = contract.methods;
  a = await contract.Show(20, offset).call();
  for (i = 0; i < a[0].length; i++)
    if (a[0][i].length > 1) {
      b = {
        name: '',
        description: '',
        image: '',
      };
      try {
        b = await $.getJSON(formatURL(a[0][i]));
      } catch (err) {}
      img =
        typeof b.image != 'undefined'
          ? `<img src="${formatURL(b.image)}">`
          : `<video autoplay muted loop><source src="${formatURL(
              (img = b.animation_url)
            )}"></video>`;
      $('#body').append(
        `<div class="nfts"><b>${b.name}</b><br><i>${b.description}</i><br>${img}<br>Price: ${a[1][i]} ETH <button onclick="buy(${a[1][i]},${a[2][i]})">Buy now</button>`
      );
    }
}
async function buy(amt, id) {
  await contract.Buy(id).send({
    from: acct[0],
    value: amt * 1e18,
    gas: 21e5,
  });
}
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
load(offset);
$(window).scroll(function () {
  if (
    Math.ceil($(window).scrollTop()) ==
    Math.ceil($(document).height() - $(window).height())
  ) {
    offset += 20;
    load(offset);
  }
});
