import { Card } from './card.model';

export interface Foundation {
    index: number,
    suit: string,
    cardStack: Card[],
}

export const nullFoundation: Foundation = {
    index: -1,
    suit: null,
    cardStack: []
};