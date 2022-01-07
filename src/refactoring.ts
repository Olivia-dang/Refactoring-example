import { IInvoice, IPerformance, IPlays } from "./type-helper";

export function statement(invoice: IInvoice, plays: IPlays) {
  const statementData: IInvoice = {
    customer: "",
    performances: []
  }
  statementData.customer = invoice.customer
  statementData.performances = invoice.performances
  return renderPlainText(statementData, invoice, plays);
}
function renderPlainText(data: IInvoice, invoice: IInvoice, plays: IPlays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${toUsd(
      amountFor(perf.audience, playFor(perf).type)
    )} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${toUsd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (let perf of data.performances) {
      result += amountFor(perf.audience, playFor(perf).type);
    }
    return result;
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function playFor(perf: IPerformance) {
    return plays[perf.playID];
  }

  function volumeCreditsFor(aPerformance: IPerformance) {
    let result = 0;
    // add volume credits
    result += Math.max(aPerformance.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }
  function toUsd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function amountFor(numberOfAudience: number, playType: string) {
    let result = 0;
    switch (playType) {
      case "tragedy":
        result = 40000;
        if (numberOfAudience > 30) {
          result += 1000 * (numberOfAudience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (numberOfAudience > 20) {
          result += 10000 + 500 * (numberOfAudience - 20);
        }
        result += 300 * numberOfAudience;
        break;
      default:
        throw new Error(`unknown type: ${playType}`);
    }
    return result;
  }
}

