export type IPlays = {
  [playName: string]: { name: string; type: string };
};

export interface IPlay {
  name: string;
  type: string;
}

// {
//   "hamlet": { "name": "Hamlet", "type": "tragedy" },
//   "as-like": { "name": "As You Like It", "type": "comedy" },
//   "othello": { "name": "Othello", "type": "tragedy" }
// }

export interface IInvoice {
  customer: string;
  performances: Array<IPerformance>;
}

export interface IPerformance {
  playID: string;
  audience: number;
}

// [
//   {
//     "customer": "BigCo",
//     "performances": [
//       {
//         "playID": "hamlet",
//         "audience": 55
//       },
//       {
//         "playID": "as-like",
//         "audience": 35
//       },
//       {
//         "playID": "othello",
//         "audience": 40
//       }
//     ]
//   }
// ]
