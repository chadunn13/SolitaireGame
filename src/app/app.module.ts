import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { DeckRowComponent } from './deck-row/deck-row.component';
import { DeckComponent } from './deck-row/deck/deck.component';
import { ShownCardsComponent } from './deck-row/shown-cards/shown-cards.component';
import { FoundationRowComponent } from './foundation-row/foundation-row.component';
import { FoundationComponent } from './foundation-row/foundation/foundation.component';
import { PileRowComponent } from './pile-row/pile-row.component';
import { PileComponent } from './pile-row/pile/pile.component';
import { DeckService } from './services/deck.service';
import { StatsRowComponent } from './stats-row/stats-row.component';
import { initialAppState } from './store';
import { AppEffects } from './store/effects';
import { metaReducer, reducers } from './store/reducers';
import { SolverComponent } from './solver/solver.component';


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
        StatsRowComponent,
        SolverComponent
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
        ),
        EffectsModule.forRoot([AppEffects]),
    ],
    providers: [DeckService],
    bootstrap: [AppComponent]
})
export class AppModule { }
