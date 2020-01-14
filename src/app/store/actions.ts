import { createAction, props } from '@ngrx/store';
import { Card } from '../models/card.model';
import { Pile } from '../models/pile.model';
import { Foundation } from '../models/foundation.model';

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

// fully reset the state with a newly shuffled deck
export const newGame = createAction(
    '[App] New Game'
);

// fully reset the state back to the original but with the same deck
export const resetGame = createAction(
    '[App] Reset Game'
);

// Only reset deck/pile/foundations, leave undo stack intact
export const resetGameSoft = createAction(
    '[App] Reset Game Soft'
);

// Only reset deck/pile/foundations, leave undo stack intact
export const invalidMove = createAction(
    '[App] Create New State'
);

export const attemptMoveToPile = createAction(
    '[Board] Attempt Move to Pile',
    props<{ cards: Card[], dest: Pile }>()
);

export const attemptMoveToFoundation = createAction(
    '[Board] Attempt Move to Foundation',
    props<{ card: Card, dest: Foundation }>()
);