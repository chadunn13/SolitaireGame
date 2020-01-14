import { ActionReducer, ActionReducerMap, createReducer, on } from '@ngrx/store';
import { DeckService } from 'src/app/services/deck.service';
import { isValueOneBigger } from '../constants/value';
import { Card } from '../models/card.model';
import { Foundation } from '../models/foundation.model';
import { Pile } from '../models/pile.model';
import { attemptMoveToFoundation, attemptMoveToPile, dealCards, drawFromDeck, newGame, resetGame, resetGameSoft, shuffleCards, undoMove } from './actions';
import { AppState, BoardState, initialAppState, initialBoardState } from './state';

const drawCardsFromDeck = (state: BoardState): BoardState => {
    let newDeckIndex;
    let oldState = { ...state };

    if (state.deckIndex < state.deck.length - 4) {
        newDeckIndex = state.deckIndex + 3;
    } else if (state.deckIndex == state.deck.length - 1) {
        newDeckIndex = -1;
    } else {
        newDeckIndex = state.deck.length - 1;
    }
    if (newDeckIndex === state.deck.length - 1) {
        return { ...state, deckIndex: newDeckIndex, deckTurn: state.deckTurn + 1, previousState: oldState }
    } else {
        return { ...state, deckIndex: newDeckIndex, previousState: oldState }
    }
}

const removeTopCard = (state: BoardState): BoardState => {
    let newDeck = Object.assign([], state.deck);
    let newDeckIndex;
    if (state.deckIndex !== -1 && state.deckIndex <= newDeck.length - 1) {
        newDeck.splice(state.deckIndex, 1);
        newDeckIndex = state.deckIndex - 1;
    }
    return { ...state, deck: newDeck, deckIndex: newDeckIndex };
}


const dealCardsToPiles = (state: BoardState): BoardState => {
    let newPiles: Pile[] = [];
    let newDeck = JSON.parse(JSON.stringify(state.deck));
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

    let newFoundations = [];
    for (let i = 0; i < 4; i++) {
        newFoundations.push(
            { index: i, cardStack: [], suit: null }
        );
    }
    return { ...state, piles: newPiles, deck: newDeck, foundations: newFoundations };
}

// Remove a card from its current position anywhere on the board and handle side effects
const removeCard = (state: BoardState, card: Card): BoardState => {
    let newState: BoardState = JSON.parse(JSON.stringify(state));

    // if moving from a foundation
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

    // if moving from a pile
    for (let pile of newState.piles) {
        for (let i = 0; i < pile.shownCards.length; i++) {
            if (DeckService.areCardsEqual(card, pile.shownCards[i])) {
                pile.shownCards.splice(i, 1);
                // If last card and there are still hidden ones in the pile, flip over the top hidden one
                if (pile.shownCards.length === 0 && pile.hiddenCards.length > 0) {
                    pile.shownCards.push(pile.hiddenCards.splice(pile.hiddenCards.length - 1, 1)[0]);
                }
                return newState;
            }
        }
    }

    // if moving from the deck
    for (let i = 0; i < newState.deck.length; i++) {
        if (DeckService.areCardsEqual(card, newState.deck[i])) {
            newState.deck.splice(i, 1);
            newState.deckIndex--;
        }
    }

    return newState;
}



const attemptMoveCardToPile = (state: BoardState, cards: Card[], dest: Pile): BoardState => {
    let newState: BoardState = JSON.parse(JSON.stringify(state));
    let oldState = { ...state };
    let isValidMove = false;

    // If moving a King-headed stack to an empty pile
    if (dest.shownCards.length === 0 && dest.hiddenCards.length === 0) {
        if (cards[0].value === "k") {
            isValidMove = true;
        }
    }
    // If moving a stack onto a normal pile
    let destCard = dest.shownCards[dest.shownCards.length - 1];
    let headCard = cards[0];
    if (!isValidMove && destCard && (
        (destCard.suit === "s" || destCard.suit === "c") && (headCard.suit === "h" || headCard.suit === "d") ||
        (destCard.suit === "h" || destCard.suit === "d") && (headCard.suit === "s" || headCard.suit === "c")
    )) {
        // if cards are opposite suits and head card is one value less, it's a valid move
        if (isValueOneBigger(destCard.value, headCard.value)) {
            isValidMove = true;
        }
    }

    if (isValidMove) {
        for (let card of cards) {
            // remove all cards in the stack that are getting moved from their original positions
            newState = removeCard(newState, card);
        }
        for (let card of cards) {
            // add all the cards in the stack to the new position
            let newDest = newState.piles.filter(pile => dest.index === pile.index)[0];
            newDest.shownCards.push(card);
        }
    } else {
        console.log("Invalid move");
    }

    if (isValidMove) {
        return { ...newState, previousState: oldState };
    } else {
        return oldState;
    }
}

const attemptMoveCardToFoundation = (state: BoardState, card: Card, dest: Foundation): BoardState => {
    let newState: BoardState = JSON.parse(JSON.stringify(state));
    let oldState = { ...state };
    let isValidMove = false;

    // If moving an Ace to an empty foundation
    if (dest.cardStack.length === 0) {
        if (card.value === "a") {
            isValidMove = true;
        }
    }

    // If moving any other card onto a foundation
    let destCard = dest.cardStack[dest.cardStack.length - 1];
    if (!isValidMove && destCard && destCard.suit === card.suit) {
        // if cards is same suit and moving card is one value more, it's a valid move
        if (isValueOneBigger(card.value, destCard.value)) {
            isValidMove = true;
        }
    }

    if (isValidMove) {
        // remove card getting moved from its original position
        newState = removeCard(newState, card);

        // add the card to the new position
        let newDest = newState.foundations.filter(foundation => dest.index === foundation.index)[0];
        newDest.cardStack.push(card);

        // set the foundation suit
        dest.suit = card.suit;
    } else {
        console.log("Invalid move");
    }

    if (isValidMove) {
        return { ...newState, previousState: oldState };
    } else {
        return oldState;
    }
}

const restorePreviousState = (state: AppState): AppState => {
    let newState: AppState = JSON.parse(JSON.stringify(state));

    if (newState.boardState.previousState) {
        let oldPrevState = JSON.parse(JSON.stringify(newState.boardState.previousState));
        newState.boardState = oldPrevState;
    }

    return newState;
}

const boardReducer = createReducer(
    initialBoardState,
    on(drawFromDeck, state => (drawCardsFromDeck(state))),
    on(shuffleCards, state => ({ ...state, deck: DeckService.shuffleDeck(JSON.parse(JSON.stringify(state.deck))) })),
    on(dealCards, state => (dealCardsToPiles(state))),
    on(attemptMoveToPile, (state, { cards, dest }) => (attemptMoveCardToPile(state, cards, dest))),
    on(attemptMoveToFoundation, (state, { card, dest }) => (attemptMoveCardToFoundation(state, card, dest))),
);

const appReducer = createReducer(
    initialAppState,
    on(undoMove, state => (restorePreviousState(state))),
    on(resetGame, state => ({ ...state })),
    on(resetGameSoft, state => ({ ...state })),
    on(newGame, state => (initialAppState)), // TODO: effect to reshuffle/redeal
);

export const reducers: ActionReducerMap<AppState> = {
    boardState: null,
};

export function metaReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return function (state, action) {
        let newState: AppState;
        if (!state) {
            newState = initialAppState;
        } else {
            newState = JSON.parse(JSON.stringify(state));
        }
        if (action.type.includes('\[Board\]') || action.type.includes('\[Deck\]')) {
            newState = {
                ...state,
                boardState: boardReducer(state.boardState, action)
            };
        } else if (action.type.includes('\[App\]')) {
            newState = appReducer(state, action);
        }
        return newState;
    };
}
