import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { Subscription } from 'rxjs';
import { BoardState, AppState } from '../store';
import { Store } from '@ngrx/store';
import { isValueOneBigger } from '../constants/value';

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
                    found = true;
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

    public static getCardStack(c: string, s: BoardState): Card[] {
        let cards = [];
        let card: Card = { value: c[0], suit: c[1] } as Card;

        for (let foundation of s.foundations) {
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

        for (let pile of s.piles) {
            let found = false;
            for (let i = 0; i < pile.shownCards.length; i++) {
                if (DeckService.areCardsEqual(card, pile.shownCards[i]) || found) {
                    cards.push(pile.shownCards[i]);
                    found = true;
                }
            }
            if (found) {
                return cards;
            }
        }

        for (let i = 0; i < s.deck.length; i++) {
            if (DeckService.areCardsEqual(card, s.deck[i])) {
                cards.push(s.deck[i]);
                return cards;
            }
        }

        return cards;
    }

    public static getParentCard(card: Card, s: BoardState): Card {
        for (let pile of s.piles) {
            for (let i = 1; i < pile.shownCards.length; i++) {
                if (DeckService.areCardsEqual(card, pile.shownCards[i])) {
                    return pile.shownCards[i - 1];
                }
            }
        }
        return null;
    }

    public static isGameComplete(boardState: BoardState): boolean {
        if (boardState.deck.length > 0) {
            return false;
        }
        for (let pile of boardState.piles) {
            if (pile.shownCards.length > 0 || pile.hiddenCards.length > 0) {
                return false;
            }
        }
        for (let foundation of boardState.foundations) {
            if (foundation.cardStack.length !== 13) {
                return false;
            }
            let previousCard: Card = null;
            for (let card of foundation.cardStack) {
                if (card.suit !== foundation.suit) {
                    return false;
                }
                if (!previousCard) {
                    if (card.value !== "a") {
                        return false;
                    }
                } else {
                    if (!isValueOneBigger(card.value, previousCard.value)) {
                        return false;
                    }
                }
                previousCard = card;
            }
        }
        return true;
    }


}