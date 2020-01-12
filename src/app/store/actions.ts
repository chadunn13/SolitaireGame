import { createAction, props } from '@ngrx/store';

// export const deckActions = {
//     '[DECK] Draw From Deck': DrawFromDeck
// }

export const drawFromDeck = createAction(
    '[Deck] Draw From Deck'
);

export const shuffleCards = createAction(
    '[Deck] Shuffle Cards'
);

export const removeCard = createAction(
    '[Deck] Remove Top Card'
);