import { Card, Cards } from '../models/card.model';
import { Pile } from '../models/pile.model';
import { Foundation } from '../models/foundation.model';

export interface AppState {
    boardState: BoardState;
}

export interface BoardState {
    deck: Card[];
    deckIndex: number;
    deckTurn: number;
    piles: Pile[];
    foundations: Foundation[];
    previousState: BoardState;
}

export const initialBoardState: BoardState = {
    deck: Cards,
    deckIndex: -1,
    deckTurn: 0,
    piles: [],
    foundations: [],
    previousState: null,
}

export const initialAppState: AppState = {
    boardState: initialBoardState,
}