import { Card } from '../models';

export interface Api {
  fetchCards(): Promise<Card[]>;
}

export default class RestApi implements Api {
  async fetchCards() {
    const response = await fetch('/api/cards');
    const json = await response.json();
    return json;
  }
}
