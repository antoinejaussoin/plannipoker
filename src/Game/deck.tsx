import React, { SFC } from 'react';
import { observer } from 'mobx-react';
import PlayingCard from '../Components/Card';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Card as CardModel } from '../models';
import styled from 'styled-components';

export interface DeckProps {
  cards: CardModel[];
  onSelect: (card: CardModel) => void;
}

const Container = styled.div`
`;

const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;

  > div {
    margin: 5px;
  }
`;

const Deck: SFC<DeckProps> = ({ cards, onSelect }) => (
  <Container>
    <Card>
      <CardContent>
        <Cards>
          { cards.map((card, index) => (
            <PlayingCard
              key={index}
              color={card.color}
              onClick={() => onSelect(card)}
            >{card.label}
            </PlayingCard>
          ))}
        </Cards>
      </CardContent>
    </Card>
  </Container>
);

export default observer(Deck);
