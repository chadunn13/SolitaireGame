import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { newGame } from '.';
import { Store, State } from '@ngrx/store';
import { AppState } from './state';
import { shuffleCards, dealCards } from './actions';
import { switchMap, tap, concatMap, withLatestFrom } from 'rxjs/operators';


@Injectable()
export class AppEffects {

    newGame$ = createEffect(() => this.actions$.pipe(
        ofType(newGame.type),
        concatMap((action) => [
            shuffleCards(),
            dealCards(),
        ]
        ),
        // tap((action) => console.log(action))
    ));

    // @Effect()
    // newState$ = this.actions$.pipe(
    //     withLatestFrom(this.store),
    //     // tap((action) => console.log(action))
    // );

    // @Effect()
    // log$ = createEffect(() => this.actions$.pipe(
    //     // switchMap((action) => [
    //     //     shuffleCards(),
    //     //     dealCards(),
    //     // ]
    //     // )
    // ));

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
    ) { }
}