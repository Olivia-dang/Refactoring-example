import { IInvoice, IPerformance, IPlays } from "./type-helper";
import { createStatementData } from "./create-statement-data";

export function htmlStatement(invoice: IInvoice, plays: IPlays) {
  return renderhtml(createStatementData(invoice, plays));
}

function renderhtml(data: any) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>";
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${toUsd(perf.amount)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${toUsd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>`;
  console.log(result);
  return result;

  function toUsd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
