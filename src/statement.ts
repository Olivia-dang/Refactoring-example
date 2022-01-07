import { IInvoice, IPerformance, IPlays } from "./type-helper";
import { createStatementData } from "./create-statement-data";

export function statement(invoice: IInvoice, plays: IPlays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data: any) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // print line for this order
    result += ` ${perf.play.name}: ${toUsd(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${toUsd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  function toUsd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
