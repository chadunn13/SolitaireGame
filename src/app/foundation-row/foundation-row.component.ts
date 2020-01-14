import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { DeckService } from '../services/deck.service';

@Component({
    selector: 'app-foundation-row',
    templateUrl: './foundation-row.component.html',
    styleUrls: ['./foundation-row.component.css']
})
export class FoundationRowComponent implements OnInit, OnDestroy {

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
