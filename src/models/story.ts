import Vote from './vote';
import * as shortid from 'shortid';

export default class Story {
  id: string;
  votes: Vote[] = [];
  flipped: boolean = false;

  constructor(public description: string = '(none)') {
    this.id = shortid();
  }
}
