import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models/card.model';

@Component({
    selector: 'app-shown-cards',
    templateUrl: './shown-cards.component.html',
    styleUrls: ['./shown-cards.component.css']
})
export class ShownCardsComponent implements OnInit {

    private card1: Card;
    private card2: Card;
    private card3: Card;

    private subscriptions: Subscription;

    constructor(
        private store: Store<AppState>,
    ) { }

    ngOnInit() {
        this.subscriptions = this.store.select('boardState').subscribe(state => {
            if (state.deckIndex > -1) {
                this.card1 = state.deck[state.deckIndex];
                if (state.deckIndex - 1 > -1) {
                    this.card2 = state.deck[state.deckIndex - 1];
                    if (state.deckIndex - 2 > -1) {
                        this.card3 = state.deck[state.deckIndex - 2];
                    } else {
                        this.card3 = null;
                    }
                } else {
                    this.card2 = null;
                    this.card3 = null;
                }
            } else {
                this.card1 = null;
                this.card2 = null;
                this.card3 = null;
            }

        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    
}
