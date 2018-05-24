import Vote from './vote';

export default class Story {
  id: number;
  votes: Vote[] = [];
  flipped: boolean = false;

  constructor(public description: string = '(none)') {
    this.id = +(Date.now() * Math.random()).toFixed(0);
  }
}
