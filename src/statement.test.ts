import { statement, htmlStatement } from "./statement";
import plays from "../mock-data/plays.json";
import invoices from "../mock-data/invoices.json";

describe("Function Statement", () => {
  it("Prints HTML BigCo", () => {
    expect(htmlStatement(invoices[0], plays)).toEqual(
      `<h1>Statement for ${invoices[0].customer}</h1>
<table>
<tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
 <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
 <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
</table>
<p>Amount owed is <em>$1,730.00</em></p>
<p>You earned <em>47</em> credits</p>`
    );
  });

  it("Prints BigCo", () => {
    expect(statement(invoices[0], plays)).toEqual(
      `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`
    );
  });
});
