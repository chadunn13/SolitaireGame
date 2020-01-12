import { Card } from './card.model';

export interface Pile {
    index: number;
    hiddenCards: Card[];
    cardStack: Card[];
}