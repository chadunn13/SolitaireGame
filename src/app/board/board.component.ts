import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isValueOneBigger } from '../constants/value';
import { Card } from '../models/card.model';
import { AppState, BoardState, newGame, undoMove } from '../store';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

    private subscriptions: Subscription;
    private boardState: BoardState;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.subscriptions = this.store.select('boardState').subscribe(state => {
            this.boardState = state;
        });

        this.newGame();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public newGame() {
        this.store.dispatch(newGame());
    }

    public undoMove() {
        this.store.dispatch(undoMove());
    }

    public isGameComplete(): boolean {
        if (this.boardState.deck.length > 0) {
            return false;
        }
        for (let pile of this.boardState.piles) {
            if (pile.shownCards.length > 0 || pile.hiddenCards.length > 0) {
                return false;
            }
        }
        for (let foundation of this.boardState.foundations) {
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
