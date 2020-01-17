import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Component({
    selector: 'app-deck-row',
    templateUrl: './deck-row.component.html',
    styleUrls: ['./deck-row.component.css']
})
export class DeckRowComponent implements OnInit {

    private foundations = [];
    private subscriptions: Subscription;

    constructor(
        private store: Store<AppState>,
    ) { }

    ngOnInit() {
        this.subscriptions = this.store.select('boardState').subscribe(state => {
            this.foundations = state.foundations;
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }


}
