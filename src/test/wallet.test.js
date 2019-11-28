import assert from 'assert';
import readline from 'readline';
import _ from 'lodash';
import { klay, utils, addWallet } from '../utils/caver';

describe('add wallet to klay accounts test', () => {
  const samplePrivateKey =
    '0xc663ff2b17e25cbfb374e2d0fdea3cceee63303ca214bfc2b54034f21aef3ea0';

  const getWallet = () => klay.accounts.wallet;

  const logPersantage = (total, nowCnt, per) => {
    per = per || total / 100;
    if ((nowCnt + 1) % per === 0) {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`${getWallet().length}/${total}`);
    }
  };

  const addWalletSeveralTimes = (count, per) => {
    try {
      let newPK = samplePrivateKey;
      process.stdout.write(`${getWallet().length}/${count}`);
      _.times(count, i => {
        newPK = utils.toHex(utils.toBN(newPK).addn(1));
        addWallet(newPK);
        logPersantage(count, i, per);
      });
    } catch (error) {
      process.stdout.write(`\n${error}`);
      process.stdout.write(`\nwallet length : ${getWallet().length}`);
    }
  };

  beforeEach(async () => {
    klay.accounts.wallet.clear();
  });

  //   it('add 10 wallet', async () => {
  //     const count = 10;
  //     addWalletSeveralTimes(count);
  //     assert.equal(klay.accounts.wallet.length, count);
  //   });

  //   it('add 1,000 wallet', async () => {
  //     const count = 1000;
  //     addWalletSeveralTimes(count);
  //     assert.equal(klay.accounts.wallet.length, count);
  //   });

  //   it('add 10,000 wallet', async () => {
  //     const count = 1000 * 10;
  //     addWalletSeveralTimes(count);
  //     assert.equal(getWallet().length, count);
  //   });

  // it('add 13,000 wallet', async () => {
  //   const count = 13 * 1000;
  //   addWalletSeveralTimes(count);
  //   assert.equal(getWallet().length, count);
  // });

  it('add 13900 wallet', async () => {
    const count = 13900;
    addWalletSeveralTimes(count, 100);
    assert.equal(getWallet().length, count);
  });

  // it('add 14,000 wallet', async () => {
  //   const count = 14 * 1000;
  //   addWalletSeveralTimes(count);
  //   assert.equal(getWallet().length, count);
  // });

  // it('add 100,000 wallet', async () => {
  //   const count = 1000 * 100;
  //   addWalletSeveralTimes(count);
  //   assert.equal(getWallet().length, count);
  // });
});
