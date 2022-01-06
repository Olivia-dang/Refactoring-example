import { IInvoice, IPlays } from "./type-helper";

export function statement(invoice: IInvoice, plays: IPlays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(play.type, perf.audience);

    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    // print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    } seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function amountFor(playType: string, numberOfAudience: number) {
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
