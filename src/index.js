import fs from 'fs';
import { klay, utils } from './utils/caver';

// init privatekey
// const privateKey =
//   '0xc663ff2b17e25cbfb374e2d0fdea3cceee63303ca214bfc2b54034f21910ff9e';

const privateKey =
  '0xc663ff2b17e25cbfb374e2d0fdea3cceee63303ca214bfc2b54034f21aef3ea0';
const addWallet = privateKey =>
  klay.accounts.wallet.add(klay.accounts.privateKeyToAccount(privateKey));

async function main() {
  const kk = klay;
  const uu = utils;
  let newPK = privateKey;
  for (let i = 0; i < 10000; i++) {
    newPK = uu.toHex(uu.toBN(newPK).addn(1));
    const wallet = addWallet(newPK);
    const balance = await kk.getBalance(wallet.address);
    if (balance > 0) {
      await logValue(newPK, balance);
    } else {
      console.log(newPK + ' has 0');
    }
    klay.accounts.wallet.clear();
  }
  console.log('done');
}

async function logValue(privatekey, value) {
  const log = JSON.parse(await fs.readFileSync('src/log/log.json', 'utf8'));
  log.push({
    privatekey,
    value
  });
  await fs.writeFileSync('src/log/log.json', JSON.stringify(log));
}
main();
