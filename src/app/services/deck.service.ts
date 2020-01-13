import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { Subscription } from 'rxjs';
import { BoardState, AppState } from '../store';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root',
})
export class DeckService {

    private subscriptions: Subscription;
    private state: BoardState;

    constructor(
        private store: Store<AppState>,
    ) {
        this.subscriptions = this.store.select('boardState').subscribe(state => {
            this.state = state;
        });
    }

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

    public static areCardsEqual(card1: Card, card2: Card): boolean {
        return card1.suit === card2.suit && card1.value === card2.value;
    }

    public getCardStack(c: string): Card[] {
        let cards = [];
        let card: Card = { value: c[0], suit: c[1] } as Card;

        for (let foundation of this.state.foundations) {
            let found = false;
            for (let i = 0; i < foundation.cardStack.length; i++) {
                if (DeckService.areCardsEqual(card, foundation.cardStack[i]) || found) {
                    cards.push(foundation.cardStack[i]);
                }
            }
            if (found) {
                return cards;
            }
        }

        for (let pile of this.state.piles) {
            let found = false;
            for (let i = 0; i < pile.shownCards.length; i++) {
                if (DeckService.areCardsEqual(card, pile.shownCards[i]) || found) {
                    cards.push(pile.shownCards[i]);
                }
            }
            if (found) {
                return cards;
            }
        }

        for (let i = 0; i < this.state.deck.length; i++) {
            if (DeckService.areCardsEqual(card, this.state.deck[i])) {
                cards.push(this.state.deck[i]);
                return cards;
            }
        }

        return cards;
    }

}