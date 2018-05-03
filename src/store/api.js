export default class Api {
  async fetchCards() {
    const response = await fetch('/api/cards');
    return await response.json();
  }
}