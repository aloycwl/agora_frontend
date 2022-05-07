async function load() {
  a = await $.getJSON(
    'https://api-rinkeby.etherscan.io/api?module=account&action=tokennfttx&address=0x15eD406870dB283E810D5885e432d315C94DD0dd&startblock=0&endblock=999999999&sort=desc&apikey=561643C1V7AJIMWFSBUYGWE8WG3NDVHS67'
  );
  for (i = 0; i < a.result.length; i++) {
    conAddr = a.result[i].contractAddress;
    to = a.result[i].to;
    id = a.result[i].tokenID;
    name = a.result[i].tokenName;
    $('#body').append(`${conAddr}, ${to}, ${id}, ${name}<br>`);
  }
}
load();
