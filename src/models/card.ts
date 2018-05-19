export default class Card {
  static getAllCards(): Card[] {
    return [
      new Card(0, '0', '#66bb6a'),
      new Card(0.5, '½', '#66bb6a'),
      new Card(1, '1', '#66bb6a'),
      new Card(2, '2', '#66bb6a'),
      new Card(3, '3', '#03a9f4'),
      new Card(5, '5', '#03a9f4'),
      new Card(8, '8', '#03a9f4'),
      new Card(13, '13', '#ba68c8'),
      new Card(20, '20', '#ba68c8'),
      new Card(40, '40', '#ba68c8'),
      new Card(99, '99', '#ba68c8'),
      new Card(0, '?', '#c2185b'),
      new Card(0, '☕️', '#c2185b'),
    ];
  }

  constructor(public readonly value: number, public readonly label: string, public readonly color: string) {}
}
