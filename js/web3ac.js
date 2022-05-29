u0 = '[]';
ua = 'uint256';
u1 = {
  internalType: ua,
  name: '',
  type: ua,
};
u2 = {
  internalType: ua + u0,
  name: '',
  type: ua + u0,
};
ub = 'address';
u3 = {
  internalType: ub,
  name: '',
  type: ub,
};
u4 = {
  internalType: ub + u0,
  name: '',
  type: ub + u0,
};
uc = 'string';
u5 = {
  internalType: uc,
  name: '',
  type: uc,
};
u6 = {
  internalType: uc + u0,
  name: '',
  type: uc + u0,
};
function waitTxt(a, b) {
  $('#' + b).html(a > 0 ? 'Loading...' : '');
}
async function LB() {
  return (await contract2.methods.balanceOf(acct).call()) / 1e18;
}
function formatURL(u) {
  if (u.includes('ipfs://') && u.length > 9)
    u = u.replace('ipfs://', 'https://ipfs.io/ipfs/');
  else if (
    /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/.test(
      u
    )
  );
  else u = '';
  return u;
}
async function load(a, b) {
  if (typeof CSS != 'undefined')
    $('head').append(
      $(
        '<meta name="viewport"content="width=device-width,initial-scale=1.0"><link rel="stylesheet">'
      ).attr('href', CSS)
    );
  if (typeof ethereum != 'undefined') {
    web3 = new Web3(ethereum);
    web3 = web3.eth;
    acct = await ethereum.request({ method: 'eth_requestAccounts' });
    acct = acct[0];
    frm = { from: acct };
    if ((await web3.net.getId()) != CHAIN) {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + CHAIN }],
      });
      location.reload();
    }
    contract = new web3.Contract(a, b);
    contract = contract.methods;
    if (typeof WB != 'undefined') {
      web3a = new Web3(WB);
      web3a = web3a.eth;
      contracta = new web3a.Contract(a, b);
      contracta = contracta.methods;
    }
  }
}
async function load2() {
  contract2 = new web3.Contract(
    [
      {
        inputs: [u3],
        name: 'balanceOf',
        outputs: [u1],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [u3, u1],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    CA2
  );
}
