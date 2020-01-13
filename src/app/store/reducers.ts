import { createReducer, ActionReducerMap, MetaReducer, on } from '@ngrx/store';
import { initialState, BoardState, AppState } from './state';
import { environment } from 'src/environments/environment';
import { drawFromDeck, shuffleCards, resetState, dealCards, attemptMoveToPile, attemptMoveToFoundation } from './actions';
import { DeckService } from 'src/app/services/deck.service';
import { Pile } from '../models/pile.model';
import { Card } from '../models/card.model';
import { Foundation } from '../models/foundation.model';
import { isValueOneBigger } from '../constants/value';

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

// Remove a card from its current position anywhere on the board and handle side effects
const removeCard = (state: BoardState, card: Card): BoardState => {
    let newState = JSON.parse(JSON.stringify(state));
    console.log('removing');

    for (let foundation of newState.foundations) {
        for (let i = 0; i < foundation.cardStack.length; i++) {
            if (card === foundation.cardStack[i]) {
                foundation.cardStack.splice(i, 1);
                // If last card, unbind the foundation's suit so any may go there
                if (foundation.cardStack.length === 0) {
                    foundation.suit = null;
                }
                return newState;
            }
        }
    }

    for (let pile of newState.piles) {
        for (let i = 0; i < pile.shownCards.length; i++) {
            if (DeckService.areCardsEqual(card, pile.shownCards[i])) {
                pile.shownCards.splice(i, 1);
                // If last card and there are still hidden ones in the pile, flip over the top hidden one
                if (pile.shownCards.length === 0 && pile.hiddenCards.length > 0) {
                    pile.shownCards.push(pile.hiddenCards.splice(pile.hiddenCards.length - 1, 1)[0]);
                    console.log(pile);
                }
                return newState;
            }
        }
    }

    for (let i = 0; i < newState.deck.length; i++) {
        if (card === newState.deck[i]) {
            newState.deck.splice(i, 1);
            newState.deckIndex--;
        }
    }

    return newState;
}



const attemptMoveCardToPile = (state: BoardState, cards: Card[], dest: Pile): BoardState => {
    let newState = JSON.parse(JSON.stringify(state));
    console.log(cards);
    console.log('temp1');

    // If moving a King-headed stack to an empty pile
    console.log(dest);
    if (dest.shownCards.length === 0 && dest.hiddenCards.length === 0) {
        console.log('temp1.1');
        if (cards[0].value === "k") {
            for (let card of cards) {
                newState = removeCard(newState, card);
            }
            for (let card of cards) {
                let newDest = newState.piles.filter(pile => dest.index === pile.index)[0];
                newDest.shownCards.push(card);
            }
            return newState;
        }
    }
    console.log('temp2');
    // If moving a stack onto a normal pile
    let destCard = dest.shownCards[dest.shownCards.length - 1];
    let headCard = cards[0];
    if (!destCard || !headCard) {
        return newState;
    }
    console.log('temp3');
    if (
        (destCard.suit === "s" || destCard.suit === "c") && (headCard.suit === "h" || headCard.suit === "d") ||
        (destCard.suit === "h" || destCard.suit === "d") && (headCard.suit === "s" || headCard.suit === "c")
    ) {
        if (isValueOneBigger(destCard.value, headCard.value)) {
            for (let card of cards) {
                newState = removeCard(newState, card);
                console.log(newState);
            }
            for (let card of cards) {
                console.log('dest');
                console.log(dest);
                console.log(newState);
                let newDest = newState.piles.filter(pile => dest.index === pile.index)[0];
                newDest.shownCards.push(card);
            }
            return newState;
        }
    }

    console.log('end');
    console.log(newState);
    return newState;
}

const attemptMoveCardToFoundation = (state: BoardState, cards: Card[], dest: Foundation): BoardState => {
    let newState = JSON.parse(JSON.stringify(state));

    return newState;
}

const reducer = createReducer(
    initialState,
    on(drawFromDeck, state => (drawCardsFromDeck(state))),
    on(shuffleCards, state => ({ ...state, deck: DeckService.shuffleDeck(Object.assign([], state.deck)) })),
    on(resetState, state => (initialState)),
    on(dealCards, state => (dealCardsToPiles(state))),
    on(attemptMoveToPile, (state, { cards, dest }) => (attemptMoveCardToPile(state, cards, dest))),
    on(attemptMoveToFoundation, (state, { cards, dest }) => (attemptMoveCardToFoundation(state, cards, dest)))
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
