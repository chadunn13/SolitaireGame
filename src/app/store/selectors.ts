import { AppState, BoardState } from './state'
import { createSelector } from '@ngrx/store';

export const selectBoardState(state: AppState) => state.boardState;

export const selectDeck = createSelector(
    selectBoardState,
    (state: BoardState) => state.deck
);

export const selectPiles = createSelector(
    selectBoardState,
    (state: BoardState) => state.piles
);

export const selectFoundations = createSelector(
    selectBoardState,
    (state: BoardState) => state.foundations
);

export const selectDeckIndex = createSelector(
    selectBoardState,
    (state: BoardState) => state.deckIndex
);