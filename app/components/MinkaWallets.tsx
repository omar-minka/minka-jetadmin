import { LedgerSdk } from "@minka/ledger-sdk";
import type { LedgerWallet } from "@minka/ledger-sdk/types";
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from "react";

export const MinkaWallets = (props: {server : string, ledger: string}) => {
  const [ wallets, setWallets ] = useState<LedgerWallet[]>([])


  const sdk = useMemo(() => {
    return new LedgerSdk({
      server: props.server,
      ledger: props.ledger
    })
  }, [])

  const getWallets = useCallback(async () => {
    const { wallets } = await sdk.wallet.list()
    setWallets(wallets)
  }, [sdk])

  useEffect(() => {
    getWallets()
  }, [getWallets]);

  return <div>
    Minka Wallets
    <ul>
      {wallets.map((wallet) => <li key={wallet.handle}>{wallet.handle}</li>)}
    </ul>
  </div>;
}

MinkaWallets.propTypes = {
  server: PropTypes.string,
  ledger: PropTypes.string,
}