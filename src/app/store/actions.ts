import { createAction, props } from '@ngrx/store';
import { Card } from '../models/card.model';
import { Pile } from '../models/pile.model';
import { Foundation } from '../models/foundation.model';
import { AppState } from '.';

export const drawFromDeck = createAction(
    '[Deck] Draw From Deck'
);

export const shuffleCards = createAction(
    '[Deck] Shuffle Cards'
);

export const dealCards = createAction(
    '[Board] Deal Cards'
);

export const undoMove = createAction(
    '[App] Undo Move'
);

export const newGame = createAction(
    '[App] New Game'
);

export const invalidMove = createAction(
    '[App] Invalid Move'
);

export const attemptMoveToPile = createAction(
    '[Board] Attempt Move to Pile',
    props<{ cards: Card[], dest: Pile }>()
);

export const attemptMoveToFoundation = createAction(
    '[Board] Attempt Move to Foundation',
    props<{ cards: Card[], dest: Foundation }>()
);

export const setAppState = createAction(
    '[App] Set App State',
    props<{ newState: AppState }>()
);