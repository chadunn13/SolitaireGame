import { createReducer, Action, ActionReducerMap, MetaReducer, on } from '@ngrx/store';
import { initialState, BoardState, AppState } from './state';
import { environment } from 'src/environments/environment';
import { drawFromDeck, shuffleCards, removeCard, resetState, dealCards } from './actions';
import { DeckService } from 'src/app/services/deck.service';
import { Pile } from '../models/pile.model';

const drawCardsFromDeck = (state: BoardState): BoardState => {
    let newDeckIndex;
    if (state.deckIndex < state.deck.length - 4) {
        newDeckIndex = state.deckIndex + 3;
    } else if (state.deckIndex == state.deck.length - 1) {
        newDeckIndex = -1;
    } else {
        newDeckIndex = state.deck.length - 1;
    }
    if (newDeckIndex === state.deck.length - 1) {
        return { ...state, deckIndex: newDeckIndex, deckTurn: state.deckTurn + 1 }
    } else {
        return { ...state, deckIndex: newDeckIndex }
    }
}

const removeTopCard = (state: BoardState): BoardState => {
    let newDeck = Object.assign([], state.deck);
    let newDeckIndex;
    if (state.deckIndex !== -1 && state.deckIndex <= newDeck.length - 1) {
        newDeck.splice(state.deckIndex, 1);
        newDeckIndex = state.deckIndex - 1;
        console.log(newDeck.length);
    }
    return { ...state, deck: newDeck, deckIndex: newDeckIndex };
}


const dealCardsToPiles = (state: BoardState): BoardState => {
    let newPiles: Pile[] = [];
    let newDeck = Object.assign([], state.deck);
    for (let i = 0; i < 7; i++) {
        let hiddenCards = [];
        let shownCards = [];
        for (let j = 0; j < i; j++) {
            hiddenCards.push(newDeck.splice(0, 1)[0]);
        }
        shownCards.push(newDeck.splice(0, 1)[0]);
        newPiles.push(
            { index: i, hiddenCards: hiddenCards, shownCards: shownCards }
        );
    }
    return { ...state, piles: newPiles, deck: newDeck };
}

const reducer = createReducer(
    initialState,
    on(drawFromDeck, state => (drawCardsFromDeck(state))),
    on(shuffleCards, state => ({ ...state, deck: DeckService.shuffleDeck(Object.assign([], state.deck)) })),
    on(removeCard, state => (removeTopCard(state))),
    on(resetState, state => (initialState)),
    on(dealCards, state => (dealCardsToPiles(state))),
);

// export function reducer(state: BoardState | undefined, action: Action) {
//     console.log('reducer');
//     switch (action) {
//         case drawFromDeck:

//         default:
//             return state;
//     }
// }

export const reducers: ActionReducerMap<AppState> = {
    boardState: reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
