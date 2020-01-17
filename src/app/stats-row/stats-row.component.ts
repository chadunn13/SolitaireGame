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
    private moves: number;

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
}
