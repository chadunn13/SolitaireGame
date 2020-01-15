import { Card, Cards } from '../models/card.model';
import { Pile } from '../models/pile.model';
import { Foundation } from '../models/foundation.model';

export interface AppState {
    boardState: BoardState;
    score: ScoreState;
}

export interface BoardState {
    deck: Card[];
    deckIndex: number;
    deckTurn: number;
    piles: Pile[];
    foundations: Foundation[];
    previousState: BoardState;
}

export interface ScoreState {
    totalScore: number;
    gameScore: number;
}

export const initialBoardState: BoardState = {
    deck: Cards,
    deckIndex: -1,
    deckTurn: 0,
    piles: [],
    foundations: [],
    previousState: null,
}

export const initialScoreState: ScoreState = {
    totalScore: 0,
    gameScore: 0,
}

export const initialAppState: AppState = {
    boardState: initialBoardState,
    score: initialScoreState,
}