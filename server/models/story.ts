import Vote from './vote';

export default class Story {
  votes: Vote[] = [];
  flipped: boolean = false;

  constructor(public description: string = '(none)') {}
}