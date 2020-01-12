import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';

@Injectable({
    providedIn: 'root',
})
export class DeckService {

    constructor() { }

    public static shuffleDeck(deck: Card[]): Card[] {
        // Durstenfeld Shuffle (Fisher-Yates Shuffle derivative)
        for (var i = deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = deck[i];
            deck[i] = deck[j];
            deck[j] = temp;
        }
        return deck;
    }

}