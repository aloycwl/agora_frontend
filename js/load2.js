async function load(o) {
  if (typeof ethereum != 'undefined')
    acct = await ethereum.request({ method: 'eth_requestAccounts' });
  count = 0;
  web3 = new Web3(ethereum);
  web3 = web3.eth;
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
      }<button onclick='sell("${a[i].asset_contract.address}",${
        a[i].token_id
      })'>Sell</button></div></div>`
    );
  }
}
load(0);
async function sell(addr, id) {
  alert(addr + ' ' + id);
}
