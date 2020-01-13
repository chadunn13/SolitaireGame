import { Card } from './card.model';

export interface Foundation {
    index: number,
    suit: string,
    cardStack: Card[],
}