import { createReducer, Action, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { initialState, BoardState, AppState } from './state';
import { environment } from 'src/environments/environment';

const deckReducer = createReducer(
    initialState
);

export function reducer(state: BoardState | undefined, action: Action) {
    switch (action.type) {
        default:
            return state;
    }
}

export const reducers: ActionReducerMap<AppState> = {
    boardState: reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
