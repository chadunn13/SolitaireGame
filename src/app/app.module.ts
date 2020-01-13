import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BoardComponent } from './board/board.component';
import { FoundationRowComponent } from './foundation-row/foundation-row.component';
import { FoundationComponent } from './foundation-row/foundation/foundation.component';
import { CardComponent } from './card/card.component';
import { PileRowComponent } from './pile-row/pile-row.component';
import { PileComponent } from './pile-row/pile/pile.component';
import { DeckComponent } from './deck-row/deck/deck.component';
import { DeckRowComponent } from './deck-row/deck-row.component';
import { ShownCardsComponent } from './deck-row/shown-cards/shown-cards.component';
import { StatsRowComponent } from './stats-row/stats-row.component';
import { DeckService } from './services/deck.service';
import { metaReducer, reducers } from './store/reducers';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { initialAppState, initialBoardState } from './store';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        FoundationRowComponent,
        FoundationComponent,
        CardComponent,
        PileRowComponent,
        PileComponent,
        DeckComponent,
        DeckRowComponent,
        ShownCardsComponent,
        StatsRowComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DragDropModule,
        StoreModule.forRoot(
            reducers,
            {
                metaReducers: [metaReducer],
                initialState: initialAppState
            }
        )
    ],
    providers: [DeckService],
    bootstrap: [AppComponent]
})
export class AppModule { }
