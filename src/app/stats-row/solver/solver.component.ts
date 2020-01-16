import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-solver',
    templateUrl: './solver.component.html',
    styleUrls: ['./solver.component.css']
})
export class SolverComponent implements OnInit {

    private subscription: Subscription;

    private states: AppState

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.store.subscribe((state) => {
            console.log('sover');
        });
    }

}
