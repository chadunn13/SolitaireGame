import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Component({
    selector: 'app-pile-row',
    templateUrl: './pile-row.component.html',
    styleUrls: ['./pile-row.component.css']
})
export class PileRowComponent implements OnInit, OnDestroy {

    private piles = [];
    private subscriptions: Subscription;

    constructor(
        private store: Store<AppState>,
    ) { }

    ngOnInit() {
        this.subscriptions = this.store.select('boardState').subscribe(state => {
            this.piles = state.piles;
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }


}
