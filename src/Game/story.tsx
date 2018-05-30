import React, { SFC } from 'react';
import { observer } from 'mobx-react';
import PlayingCard from '../Components/Card';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Story } from '../models';

export interface PlayerListProps {
  story: Story;
}

const StoryCard: SFC<PlayerListProps> = observer(({ story }) => (
  <Card>
    <CardHeader
      title={story.description}
    />
    <CardContent>
      { story.votes.map((vote, index) =>
        <PlayingCard
          key={index}
          color={vote.card.color}>{vote.card.label}
        </PlayingCard>) }
    </CardContent>
  </Card>
));

export default StoryCard;
