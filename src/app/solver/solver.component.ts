import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState, newGame, setAppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Solver } from './solver';

@Component({
    selector: 'app-solver',
    templateUrl: './solver.component.html',
    styleUrls: ['./solver.component.css']
})
export class SolverComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    private moves: AppState[];
    private state: AppState;
    private isRunning: boolean = false;
    // private interval;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.store.subscribe((state) => {
            this.state = state;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private onClick() {
        if (this.isRunning) {
            // this.stopSolve();
        } else {
            this.startSolve();
        }
    }

    private stopSolve() {
        // clearInterval(this.interval);
        this.isRunning = false;
    }

    private startSolve() {
        this.isRunning = true;

        let headSolver = new Solver(this.state, this.store, []);
        console.log('solving');
        headSolver.startSolver().then((resolve) => {
            console.log(resolve);
            if (resolve) {
                console.log('win');
            } else {
                console.log('fail');
            }
            console.log("iterations: ", headSolver.countIters());
            console.log("max score:");
            let maxState = headSolver.getMaxScore();
            console.log(maxState);
            this.store.dispatch(setAppState({newState: maxState}))
        }).catch((reject) => {
            console.log('reject1');
            console.log(reject);
        });

        this.isRunning = false;
    }

}
