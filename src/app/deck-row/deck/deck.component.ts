import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BoardState, AppState, drawFromDeck, shuffleCards, removeCard } from 'src/app/store';
import { Card } from 'src/app/models/card.model';
import { Subscription, Observable } from 'rxjs';
import { selectBoardState, selectDeckIndex, getBoardState } from 'src/app/store/selectors';
import { ThrowStmt } from '@angular/compiler';
import { DeckService } from 'src/app/services/deck.service';

@Component({
    selector: 'app-deck',
    templateUrl: './deck.component.html',
    styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit, OnDestroy {
    private deck: Card[];
    private deckIndex: number;
    private deckTurn: number;

    private subscriptions: Subscription;

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {
        this.subscriptions = this.store.select('boardState').subscribe(state => {
            this.deckIndex = state.deckIndex;
            this.deck = state.deck;
            this.deckTurn = state.deckTurn;
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public isDeckEmpty() {
        return this.deckIndex >= this.deck.length - 1;
    }

    public drawCards() {
        if (this.canDrawCards()) {
            this.store.dispatch(drawFromDeck());
        }
    }

    public removeCard() {
        this.store.dispatch(removeCard());
    }

    public canDrawCards() {
        return this.deckTurn < 3;
    }
}
