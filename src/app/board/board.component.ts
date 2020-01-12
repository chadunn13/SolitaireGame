import { Component, OnInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeckService } from '../services/deck.service';
import { Cards } from '../models/card.model';
import { BoardState, shuffleCards, AppState, resetState, dealCards } from '../store';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

    private subscriptions: Subscription;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
    }

    public newGame() {
        this.store.dispatch(resetState());
        this.store.dispatch(shuffleCards());
        this.store.dispatch(dealCards());
    }

}
