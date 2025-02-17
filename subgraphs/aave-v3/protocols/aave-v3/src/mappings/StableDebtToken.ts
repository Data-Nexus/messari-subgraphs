import {
  Burn,
  Mint,
} from "../../../../generated/templates/StableDebtToken/StableDebtToken";
import { getMarketById } from "../entities/market";
import { updateUserStableBorrowerPosition } from "../entities/position";
import { getReserve, updateReserveStableDebtSupply } from "../entities/reserve";

export function handleBurn(event: Burn): void {
  updateReserveStableDebtSupply(event, event.params.newTotalSupply);

  const reserve = getReserve(event.address);
  const balance = event.params.currentBalance.minus(event.params.amount);
  updateUserStableBorrowerPosition(
    event,
    event.params.from,
    getMarketById(reserve.id),
    balance
  );
}

export function handleMint(event: Mint): void {
  updateReserveStableDebtSupply(event, event.params.newTotalSupply);

  const reserve = getReserve(event.address);
  const balance = event.params.currentBalance.plus(event.params.amount);
  updateUserStableBorrowerPosition(
    event,
    event.params.onBehalfOf,
    getMarketById(reserve.id),
    balance
  );
}
