import { Action, Store } from '@ngrx/store';
import { AppState, setAppState, drawFromDeck, calculateScore, drawCardsFromDeck, attemptMoveCardToPile, attemptMoveCardToFoundation, BoardState } from '../store';
import { DeckService } from '../services/deck.service';
import { Card } from '../models/card.model';
import { Pile } from '../models/pile.model';
import { Foundation } from '../models/foundation.model';
import { ThrowStmt } from '@angular/compiler';
import { Md5 } from 'ts-md5/dist/md5';
import { isValueOneBigger } from '../constants/value';


export class Solver {
    solvers: Solver[] = [];

    constructor(
        private state: AppState,
        private store: Store<AppState>,
        private hashes: (Int32Array | string)[]
    ) {
    }

    public async startSolver(double = false): Promise<boolean> {
        this.store.dispatch(setAppState({ newState: this.state }));

        if (DeckService.isGameComplete(this.state.boardState)) {
            // console.log('game complete');
            return new Promise(() => { return true });
        } else {
            // console.log('finding');
            this.findValidActions(double);
            // console.log(this.solvers);

            let promise;
            // console.log(this.state.boardState.deckTurn, this.state.boardState.deckIndex);
            await this.processNextSolvers().then((resolve) => {
                // console.log('resolve2');
                promise = resolve;
            }).catch((reject) => { promise = reject });
            // console.log(this.state.boardState.deckTurn, this.state.boardState.deckIndex);
            return new Promise<boolean>((resolve, reject) => resolve(promise));
        }
    }

    public countIters(): number {
        let count = 0;
        for (let solver of this.solvers) {
            count = count + 1 + solver.countIters();
        }
        return count;
    }

    public getMaxScore(): AppState {
        let max = this.state;
        for (let solver of this.solvers) {
            let tempScore = solver.getMaxScore();
            if (tempScore.score.gameScore > max.score.gameScore) {
                max = tempScore;
            }
        }
        return max;
    }

    private addSolver(appState: AppState) {
        let newState = {
            ...appState,
            boardState: appState.boardState,
            score: { ...appState.score, gameScore: calculateScore(appState.boardState.foundations) }
        };

        // prevent duplicate states
        let hash = Md5.hashStr(JSON.stringify({ ...newState.boardState, previousState: null, moves: 0 } as BoardState));
        if (!this.hashes.includes(hash)) {
            this.hashes.push(hash);
            this.solvers.push(new Solver(newState, this.store, this.hashes));
        }
    }

    private moveToPile(card: Card, fromPile?: Pile) {
        for (let pile of this.state.boardState.piles) {
            if (fromPile && pile === fromPile) {
                continue;
            }
            if (fromPile) {
                // if moving stack between two parent cards, don't bother unless the original parent card can be moved to foundation
                let parentCard = DeckService.getParentCard(card, this.state.boardState);
                if (parentCard) {
                    for (let foundation of this.state.boardState.foundations) {
                        if (parentCard.suit === foundation.suit && foundation.cardStack.length > 0) {
                            if (!isValueOneBigger(parentCard.value, foundation.cardStack[foundation.cardStack.length - 1].value)) {
                                return;
                            }
                        }
                    }
                }
            }
            let moveState = attemptMoveCardToPile(this.state.boardState, DeckService.getCardStack(card.value + card.suit, this.state.boardState), pile, true, fromPile);
            if (moveState) {
                this.addSolver({ ...this.state, boardState: moveState });
                if (card.value === "k" && pile.hiddenCards.length === 0) {
                    // moving a king to empty, dont bother trying to move to other empty piles
                    return;
                }
            }
        }
    }

    private moveToFoundation(card: Card): boolean {
        for (let foundation of this.state.boardState.foundations) {
            let moveState = attemptMoveCardToFoundation(this.state.boardState, card, foundation, true);
            if (moveState) {
                this.addSolver({ ...this.state, boardState: moveState });
                return true;
            }
        }
        return false;
    }

    private moveFromDeck(card): boolean {
        if (this.moveToFoundation(card)) {
            return true;
        }
        this.moveToPile(card);
        return false;
    }

    private findValidActions(double = false) {
        if (this.state.boardState.deckIndex >= 0) {
            if (this.moveFromDeck(this.state.boardState.deck[this.state.boardState.deckIndex])) {
                // best move
                return;
            }
        }

        for (let pile of this.state.boardState.piles) {
            for (let card of pile.shownCards) {
                if (this.moveToFoundation(card)) {
                    // second best move;
                    return;
                }
                this.moveToPile(card, pile);
            }
        }

        // for (let foundation of this.state.boardState.foundations) {
        //     if (foundation.cardStack.length > 0) {
        //         let card = foundation.cardStack[foundation.cardStack.length - 1];
        //         if (card.value !== "a") {
        //             this.moveToPile(card);
        //         }
        //     }
        // }

        let deckDrawState = drawCardsFromDeck(this.state.boardState, true);
        if (deckDrawState) {
            this.addSolver({ ...this.state, boardState: deckDrawState });
            // if (double) {
            //     this.addSolver({ ...this.state, boardState: deckDrawState });
            // }
        }

        // for (i in )
    }

    private async delay(ms) {
        // return await for better async stack trace support in case of errors.
        // console.log('delay');
        return await new Promise(resolve => setTimeout(resolve, ms));
    }

    private async processNextSolvers(): Promise<boolean> {
        let i = 0;
        let found: boolean;
        // let interval = await setInterval(async () => {
        while (true) {
            // console.log('iterating:', i);
            if (i >= this.solvers.length) {
                // console.log('break');
                // clearInterval(interval);
                found = false;
                break;
            }
            await this.delay(20);

            await this.solvers[i].startSolver(true).then((resolve) => {
                if (resolve) {
                    // console.log('found is true');
                    // clearInterval(interval);
                    found = true;
                    // return;
                } else {
                    // console.log('increasing i');
                    i++;
                }
            });

            if (found) {
                console.log('found solution');
                break;
            } else {
                console.log('end of the line');
            }
            // }, 500);

        }

        return new Promise<boolean>((resolve) => { resolve(found) });
    }


}