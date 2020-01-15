import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState, BoardState, newGame, undoMove } from '../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Foundation } from '../models/foundation.model';
import { Card } from '../models/card.model';
import { isValueOneBigger } from '../constants/value';

@Component({
    selector: 'app-stats-row',
    templateUrl: './stats-row.component.html',
    styleUrls: ['./stats-row.component.css']
})
export class StatsRowComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription = new Subscription();
    private score: number;
    private boardState: BoardState;

    constructor(
        private store: Store<AppState>,
    ) { }

    ngOnInit() {
        this.subscriptions.add(this.store.select('score').subscribe((score) => {
            this.score = score.totalScore + score.gameScore;
        }));
        this.subscriptions.add(this.store.select('boardState').subscribe((state) => {
            this.boardState = state;
        }))
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
