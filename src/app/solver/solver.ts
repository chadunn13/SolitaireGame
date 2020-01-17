import { Action, Store } from '@ngrx/store';
import { AppState, setAppState, drawFromDeck, calculateScore, drawCardsFromDeck } from '../store';
import { DeckService } from '../services/deck.service';

export class Solver {
    solvers: Solver[] = [];

    constructor(
        private state: AppState,
        private store: Store<AppState>
    ) {
    }

    public async startSolver(): Promise<boolean> {
        this.store.dispatch(setAppState({ newState: this.state }));

        if (DeckService.isGameComplete(this.state.boardState)) {
            console.log('game complete');
            return new Promise(() => { console.log('complete resolve'); return true });
        } else {
            console.log('finding');
            this.findValidActions();
            console.log(this.solvers);

            let promise;
            console.log(this.state.boardState.deckTurn, this.state.boardState.deckIndex);
            await this.processNextSolvers().then((resolve) => {
                console.log('resolve2');
                promise = resolve;
            }).catch((reject) => {console.log('reject2'); promise = reject});
            console.log(this.state.boardState.deckTurn, this.state.boardState.deckIndex);
            return new Promise<boolean>((resolve, reject) => resolve(promise));
        }
    }

    private addSolver(appState: AppState) {
        let newState = {
            ...appState,
            boardState: appState.boardState,
            score: { ...appState.score, gameScore: calculateScore(appState.boardState.foundations) }
        };

        this.solvers.push(new Solver(newState, this.store));
    }

    private findValidActions() {
        let deckDrawState = drawCardsFromDeck(this.state.boardState, true);
        if (deckDrawState) {
            this.addSolver({ ...this.state, boardState: deckDrawState });
            this.addSolver({ ...this.state, boardState: deckDrawState });
        }
    }

    private async delay(ms) {
        // return await for better async stack trace support in case of errors.
        console.log('delay');
        return await new Promise(resolve => setTimeout(resolve, ms));
    }

    private async processNextSolvers(): Promise<boolean> {
        let i = 0;
        let found: boolean;
        // let interval = await setInterval(async () => {
        while (true) {
            console.log('iterating:', i);
            if (i >= this.solvers.length) {
                console.log('break');
                // clearInterval(interval);
                found = false;
                break;
            }

            await this.solvers[i].startSolver().then((resolve) => {
                if (resolve) {
                    console.log('found is true');
                    // clearInterval(interval);
                    found = true;
                    // return;
                } else {
                    console.log('increasing i');
                    i++;
                }
            });

            if (found) {
                console.log('found');
                break;
            } else {
                console.log('not found');
            }

            // await this.delay(100);
            // }, 500);

        }

        console.log('while over');
        return new Promise<boolean>((resolve) => { console.log ('bottom resolve'); resolve(found) });
    }


}