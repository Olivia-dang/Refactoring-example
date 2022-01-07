import { IInvoice, IPerformance, IPlay, IPlays } from "./type-helper";

export function createStatementData(invoice: IInvoice, plays: IPlays) {
  const statementData: any = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  function enrichPerformance(aPerformance: IPerformance) {
    // shallow copy object => immutable origin
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result: any = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  function playFor(perf: IPerformance) {
    return plays[perf.playID];
  }

  function totalAmount(data) {
    return data.performances.reduce((acc, perf) => acc + perf.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((acc, perf) => acc + perf.volumeCredits, 0);
  }

  return statementData;
}
function createPerformanceCalculator(aPerformance: IPerformance, aPlay: IPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
}
class PerformanceCalculator {
  [x: string]: any;

  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}
class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits(): number {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}
