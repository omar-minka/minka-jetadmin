import type { V2_MetaFunction } from "@remix-run/node";
import { MinkaWallets } from "~/components/MinkaWallets";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <MinkaWallets server="https://ldg-stg.one/api/v2" ledger="omar"/>
    </div>
  );
}
