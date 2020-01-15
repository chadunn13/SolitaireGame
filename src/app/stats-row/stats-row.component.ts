import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Foundation } from '../models/foundation.model';

@Component({
    selector: 'app-stats-row',
    templateUrl: './stats-row.component.html',
    styleUrls: ['./stats-row.component.css']
})
export class StatsRowComponent implements OnInit, OnDestroy {

    private subscriptions: Subscription;
    private score: number;

    constructor(
        private store: Store<AppState>,
    ) { }

    ngOnInit() {
        this.subscriptions = this.store.select('score').subscribe((score) => {
            this.score = score;
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
