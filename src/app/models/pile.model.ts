import { Card } from './card.model';
import { PileComponent } from '../pile-row/pile/pile.component';

export interface Pile {
    index: number;
    hiddenCards: Card[];
    shownCards: Card[];
}

export const nullPile: Pile = {
    index: -1,
    hiddenCards: [],
    shownCards: []
};