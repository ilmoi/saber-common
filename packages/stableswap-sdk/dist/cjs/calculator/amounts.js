"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateEstimatedMintAmount = exports.calculateEstimatedWithdrawAmount = exports.normalizedTradeFee = exports.calculateEstimatedWithdrawOneAmount = exports.calculateEstimatedSwapOutputAmount = exports.calculateVirtualPrice = void 0;
const tslib_1 = require("tslib");
const token_utils_1 = require("@saberhq/token-utils");
const jsbi_1 = tslib_1.__importDefault(require("jsbi"));
const curve_js_1 = require("./curve.js");
/**
 * Calculates the current virtual price of the exchange.
 * @param exchange
 * @returns
 */
const calculateVirtualPrice = (exchange) => {
    const amount = exchange.lpTotalSupply;
    if (amount === undefined || amount.equalTo(0)) {
        // pool has no tokens
        return null;
    }
    const price = new token_utils_1.Fraction((0, curve_js_1.computeD)(exchange.ampFactor, exchange.reserves[0].amount.raw, exchange.reserves[1].amount.raw), amount.raw);
    return price;
};
exports.calculateVirtualPrice = calculateVirtualPrice;
/**
 * Calculates the estimated output amount of a swap.
 * @param exchange
 * @param fromAmount
 * @returns
 */
const calculateEstimatedSwapOutputAmount = (exchange, fromAmount) => {
    const [fromReserves, toReserves] = fromAmount.token.equals(exchange.reserves[0].amount.token)
        ? [exchange.reserves[0], exchange.reserves[1]]
        : [exchange.reserves[1], exchange.reserves[0]];
    if (fromAmount.equalTo(0)) {
        const zero = new token_utils_1.TokenAmount(toReserves.amount.token, token_utils_1.ZERO);
        return {
            outputAmountBeforeFees: zero,
            outputAmount: zero,
            fee: zero,
            lpFee: zero,
            adminFee: zero,
        };
    }
    const amp = exchange.ampFactor;
    const amountBeforeFees = jsbi_1.default.subtract(toReserves.amount.raw, (0, curve_js_1.computeY)(amp, jsbi_1.default.add(fromReserves.amount.raw, fromAmount.raw), (0, curve_js_1.computeD)(amp, fromReserves.amount.raw, toReserves.amount.raw)));
    const outputAmountBeforeFees = new token_utils_1.TokenAmount(toReserves.amount.token, amountBeforeFees);
    const fee = new token_utils_1.TokenAmount(toReserves.amount.token, exchange.fees.trade.asFraction.multiply(amountBeforeFees).toFixed(0));
    const adminFee = new token_utils_1.TokenAmount(toReserves.amount.token, exchange.fees.adminTrade.asFraction.multiply(fee.raw).toFixed(0));
    const lpFee = fee.subtract(adminFee);
    const outputAmount = new token_utils_1.TokenAmount(toReserves.amount.token, jsbi_1.default.subtract(amountBeforeFees, fee.raw));
    return {
        outputAmountBeforeFees,
        outputAmount,
        fee: fee,
        lpFee,
        adminFee,
    };
};
exports.calculateEstimatedSwapOutputAmount = calculateEstimatedSwapOutputAmount;
const N_COINS = jsbi_1.default.BigInt(2);
/**
 * Calculates the amount of tokens withdrawn if only withdrawing one token.
 * @returns
 */
const calculateEstimatedWithdrawOneAmount = ({ exchange, poolTokenAmount, withdrawToken, }) => {
    var _a, _b, _c, _d;
    if (poolTokenAmount.equalTo(0)) {
        // final quantities
        const zeroQuantity = new token_utils_1.TokenAmount(withdrawToken, token_utils_1.ZERO);
        return {
            withdrawAmount: zeroQuantity,
            withdrawAmountBeforeFees: zeroQuantity,
            swapFee: zeroQuantity,
            withdrawFee: zeroQuantity,
            lpSwapFee: zeroQuantity,
            lpWithdrawFee: zeroQuantity,
            adminSwapFee: zeroQuantity,
            adminWithdrawFee: zeroQuantity,
        };
    }
    const { ampFactor, fees } = exchange;
    const [baseReserves, quoteReserves] = [
        (_b = (_a = exchange.reserves.find((r) => r.amount.token.equals(withdrawToken))) === null || _a === void 0 ? void 0 : _a.amount.raw) !== null && _b !== void 0 ? _b : token_utils_1.ZERO,
        (_d = (_c = exchange.reserves.find((r) => !r.amount.token.equals(withdrawToken))) === null || _c === void 0 ? void 0 : _c.amount.raw) !== null && _d !== void 0 ? _d : token_utils_1.ZERO,
    ];
    const d_0 = (0, curve_js_1.computeD)(ampFactor, baseReserves, quoteReserves);
    const d_1 = jsbi_1.default.subtract(d_0, jsbi_1.default.divide(jsbi_1.default.multiply(poolTokenAmount.raw, d_0), exchange.lpTotalSupply.raw));
    const new_y = (0, curve_js_1.computeY)(ampFactor, quoteReserves, d_1);
    // expected_base_amount = swap_base_amount * d_1 / d_0 - new_y;
    const expected_base_amount = jsbi_1.default.subtract(jsbi_1.default.divide(jsbi_1.default.multiply(baseReserves, d_1), d_0), new_y);
    // expected_quote_amount = swap_quote_amount - swap_quote_amount * d_1 / d_0;
    const expected_quote_amount = jsbi_1.default.subtract(quoteReserves, jsbi_1.default.divide(jsbi_1.default.multiply(quoteReserves, d_1), d_0));
    // new_base_amount = swap_base_amount - expected_base_amount * fee / fee_denominator;
    const new_base_amount = new token_utils_1.Fraction(baseReserves.toString(), 1).subtract((0, exports.normalizedTradeFee)(fees, N_COINS, expected_base_amount));
    // new_quote_amount = swap_quote_amount - expected_quote_amount * fee / fee_denominator;
    const new_quote_amount = new token_utils_1.Fraction(quoteReserves.toString(), 1).subtract((0, exports.normalizedTradeFee)(fees, N_COINS, expected_quote_amount));
    const dy = new_base_amount.subtract((0, curve_js_1.computeY)(ampFactor, jsbi_1.default.BigInt(new_quote_amount.toFixed(0)), d_1).toString());
    const dy_0 = jsbi_1.default.subtract(baseReserves, new_y);
    // lp fees
    const swapFee = new token_utils_1.Fraction(dy_0.toString(), 1).subtract(dy);
    const withdrawFee = dy.multiply(fees.withdraw.asFraction);
    // admin fees
    const adminSwapFee = swapFee.multiply(fees.adminTrade.asFraction);
    const adminWithdrawFee = withdrawFee.multiply(fees.adminWithdraw.asFraction);
    // final LP fees
    const lpSwapFee = swapFee.subtract(adminSwapFee);
    const lpWithdrawFee = withdrawFee.subtract(adminWithdrawFee);
    // final withdraw amount
    const withdrawAmount = dy.subtract(withdrawFee).subtract(swapFee);
    // final quantities
    return {
        withdrawAmount: new token_utils_1.TokenAmount(withdrawToken, withdrawAmount.toFixed(0)),
        withdrawAmountBeforeFees: new token_utils_1.TokenAmount(withdrawToken, dy.toFixed(0)),
        swapFee: new token_utils_1.TokenAmount(withdrawToken, swapFee.toFixed(0)),
        withdrawFee: new token_utils_1.TokenAmount(withdrawToken, withdrawFee.toFixed(0)),
        lpSwapFee: new token_utils_1.TokenAmount(withdrawToken, lpSwapFee.toFixed(0)),
        lpWithdrawFee: new token_utils_1.TokenAmount(withdrawToken, lpWithdrawFee.toFixed(0)),
        adminSwapFee: new token_utils_1.TokenAmount(withdrawToken, adminSwapFee.toFixed(0)),
        adminWithdrawFee: new token_utils_1.TokenAmount(withdrawToken, adminWithdrawFee.toFixed(0)),
    };
};
exports.calculateEstimatedWithdrawOneAmount = calculateEstimatedWithdrawOneAmount;
/**
 * Compute normalized fee for symmetric/asymmetric deposits/withdraws
 */
const normalizedTradeFee = ({ trade }, n_coins, amount) => {
    const adjustedTradeFee = new token_utils_1.Fraction(n_coins, jsbi_1.default.multiply(jsbi_1.default.subtract(n_coins, token_utils_1.ONE), jsbi_1.default.BigInt(4)));
    return new token_utils_1.Fraction(amount, 1).multiply(trade).multiply(adjustedTradeFee);
};
exports.normalizedTradeFee = normalizedTradeFee;
const calculateEstimatedWithdrawAmount = ({ poolTokenAmount, reserves, fees, lpTotalSupply, }) => {
    if (lpTotalSupply.equalTo(0)) {
        const zero = reserves.map((r) => new token_utils_1.TokenAmount(r.amount.token, token_utils_1.ZERO));
        return {
            withdrawAmounts: zero,
            withdrawAmountsBeforeFees: zero,
            fees: zero,
        };
    }
    const share = poolTokenAmount.divide(lpTotalSupply);
    const withdrawAmounts = reserves.map(({ amount }) => {
        const baseAmount = share.multiply(amount.raw);
        const fee = baseAmount.multiply(fees.withdraw.asFraction);
        return [
            new token_utils_1.TokenAmount(amount.token, jsbi_1.default.BigInt(baseAmount.subtract(fee).toFixed(0))),
            {
                beforeFees: jsbi_1.default.BigInt(baseAmount.toFixed(0)),
                fee: jsbi_1.default.BigInt(fee.toFixed(0)),
            },
        ];
    });
    return {
        withdrawAmountsBeforeFees: withdrawAmounts.map(([amt, { beforeFees }]) => new token_utils_1.TokenAmount(amt.token, beforeFees)),
        withdrawAmounts: [withdrawAmounts[0][0], withdrawAmounts[1][0]],
        fees: withdrawAmounts.map(([amt, { fee }]) => new token_utils_1.TokenAmount(amt.token, fee)),
    };
};
exports.calculateEstimatedWithdrawAmount = calculateEstimatedWithdrawAmount;
/**
 * Calculate the estimated amount of LP tokens minted after a deposit.
 * @param exchange
 * @param depositAmountA
 * @param depositAmountB
 * @returns
 */
const calculateEstimatedMintAmount = (exchange, depositAmountA, depositAmountB) => {
    if (jsbi_1.default.equal(depositAmountA, token_utils_1.ZERO) && jsbi_1.default.equal(depositAmountB, token_utils_1.ZERO)) {
        const zero = new token_utils_1.TokenAmount(exchange.lpTotalSupply.token, token_utils_1.ZERO);
        return {
            mintAmountBeforeFees: zero,
            mintAmount: zero,
            fees: zero,
        };
    }
    const amp = exchange.ampFactor;
    const [reserveA, reserveB] = exchange.reserves;
    const d0 = (0, curve_js_1.computeD)(amp, reserveA.amount.raw, reserveB.amount.raw);
    const d1 = (0, curve_js_1.computeD)(amp, jsbi_1.default.add(reserveA.amount.raw, depositAmountA), jsbi_1.default.add(reserveB.amount.raw, depositAmountB));
    if (jsbi_1.default.lessThan(d1, d0)) {
        throw new Error("New D cannot be less than previous D");
    }
    const oldBalances = exchange.reserves.map((r) => r.amount.raw);
    const newBalances = [
        jsbi_1.default.add(reserveA.amount.raw, depositAmountA),
        jsbi_1.default.add(reserveB.amount.raw, depositAmountB),
    ];
    const adjustedBalances = newBalances.map((newBalance, i) => {
        const oldBalance = oldBalances[i];
        const idealBalance = new token_utils_1.Fraction(d1, d0).multiply(oldBalance);
        const difference = idealBalance.subtract(newBalance);
        const diffAbs = difference.greaterThan(0)
            ? difference
            : difference.multiply(-1);
        const fee = (0, exports.normalizedTradeFee)(exchange.fees, N_COINS, jsbi_1.default.BigInt(diffAbs.toFixed(0)));
        return jsbi_1.default.subtract(newBalance, jsbi_1.default.BigInt(fee.toFixed(0)));
    });
    const d2 = (0, curve_js_1.computeD)(amp, adjustedBalances[0], adjustedBalances[1]);
    const lpSupply = exchange.lpTotalSupply;
    const mintAmountRaw = jsbi_1.default.divide(jsbi_1.default.multiply(lpSupply.raw, jsbi_1.default.subtract(d2, d0)), d0);
    const mintAmount = new token_utils_1.TokenAmount(exchange.lpTotalSupply.token, mintAmountRaw);
    const mintAmountRawBeforeFees = jsbi_1.default.divide(jsbi_1.default.multiply(lpSupply.raw, jsbi_1.default.subtract(d1, d0)), d0);
    const fees = new token_utils_1.TokenAmount(exchange.lpTotalSupply.token, jsbi_1.default.subtract(mintAmountRawBeforeFees, mintAmountRaw));
    const mintAmountBeforeFees = new token_utils_1.TokenAmount(exchange.lpTotalSupply.token, mintAmountRawBeforeFees);
    return {
        mintAmount,
        mintAmountBeforeFees,
        fees,
    };
};
exports.calculateEstimatedMintAmount = calculateEstimatedMintAmount;
//# sourceMappingURL=amounts.js.map