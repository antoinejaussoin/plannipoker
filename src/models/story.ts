import Vote from './vote';
import shortid from 'shortid';

export default class Story {
  id: string;
  votes: Vote[] = [];
  flipped: boolean = false;

  constructor(public title: string, public description: string) {
    this.id = shortid();
  }
}
