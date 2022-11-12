import "chai-as-promised";
import type { Idl } from "@project-serum/anchor";
import type { PromiseOrValue, TransactionLike, TransactionReceipt } from "@saberhq/solana-contrib";
/**
 * Processes a transaction, expecting rejection or fulfillment.
 *
 * @param tx
 * @param msg
 * @param cb
 * @returns
 */
export declare const expectTX: (tx: PromiseOrValue<TransactionLike | null>, msg?: string, cb?: ((receipt: TransactionReceipt) => Promise<void>) | undefined) => Chai.PromisedAssertion;
export declare type IDLError = NonNullable<Idl["errors"]>[number];
export declare const assertError: (error: IDLError, other: IDLError) => void;
//# sourceMappingURL=utils.d.ts.map