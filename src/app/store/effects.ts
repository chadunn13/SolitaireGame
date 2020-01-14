import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap } from 'rxjs/operators';
import { newGame } from '.';
import { dealCards, shuffleCards } from './actions';
import { AppState } from './state';


@Injectable()
export class AppEffects {

    newGame$ = createEffect(() => this.actions$.pipe(
        ofType(newGame.type),
        concatMap((action) => [
            shuffleCards(),
            dealCards(),
        ]
        ),
    ));

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
    ) { }
}