import { LedgerSdk } from "@minka/ledger-sdk";
import type { LedgerWallet } from "@minka/ledger-sdk/types";
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Buffer } from "buffer-polyfill";

globalThis.Buffer = Buffer as unknown as BufferConstructor;
export const MinkaWallets = (props: {server : string, ledger: string}) => {
  const [ wallets, setWallets ] = useState<LedgerWallet[]>([])


  const sdk = useMemo(() => {
    return new LedgerSdk({
      server: props.server,
      ledger: props.ledger
    })
  }, [])

  useEffect(() => {
    const handleCustomEvent = (value:any) => {
      const event = new CustomEvent('testEvent', {
        detail: value
      });
      window.dispatchEvent(event);
    }
    
    let i = 1;
    handleCustomEvent(0);
    // Ejemplo: Disparar el evento cada 3 segundos
    setInterval(() => {
      handleCustomEvent(i); // Pasa el valor deseado como argumento
      ++i;
    }, 3000);
  }, []);

  const getWallets = useCallback(async () => {
    const { wallets } = await sdk.wallet.list()
    setWallets(wallets)
  }, [sdk])

  const createWallet = useCallback(async () => {
    let signer : any = sdk.signer.init().data({handle:'omar'}).keys({format: 'ed25519-raw'})
    signer = await signer.read()
    const keyPair = {
      public: signer.data.public,
      secret: signer.data.secret || '',
      format: signer.data.format
    }
    const signedWallet = await sdk.wallet.init().data({handle:'omar'}).hash().sign([{keyPair}])
    return
    const { wallet } = await signedWallet.send()
    console.log(wallet)
  }, [sdk])

  useEffect(() => {
    getWallets()
  }, [getWallets]);

  return <div>
    Minka Wallets
    <ul>
      {wallets.map((wallet) => <li key={wallet.handle}>{wallet.handle}</li>)}
    </ul>
    <button onClick={createWallet}>Create now!</button>
  </div>;
}

MinkaWallets.propTypes = {
  server: PropTypes.string,
  ledger: PropTypes.string,
}