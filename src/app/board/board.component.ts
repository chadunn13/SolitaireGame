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

        // this.newGame();
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
