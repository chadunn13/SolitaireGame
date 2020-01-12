import { AppState, BoardState } from './state'
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectBoardState = (state: AppState) => { return state.boardState };

export const getBoardState = createFeatureSelector('boardState');

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

export const selectDeckTurn = createSelector(
    selectBoardState,
    (state: BoardState) => state.deckTurn
);