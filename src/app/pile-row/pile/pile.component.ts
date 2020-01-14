import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppState, attemptMoveToPile } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Pile, nullPile } from 'src/app/models/pile.model';
import { Card } from 'src/app/models/card.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DeckService } from 'src/app/services/deck.service';

@Component({
    selector: 'app-pile',
    templateUrl: './pile.component.html',
    styleUrls: ['./pile.component.css']
})
export class PileComponent implements OnInit, OnDestroy {

    @Input() private pile: Pile = nullPile;

    constructor(
        private store: Store<AppState>,
        private deckService: DeckService,
    ) { }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }

    public isEmpty(): boolean {
        if (this.pile) {
            return this.pile.hiddenCards.length === 0 && this.pile.shownCards.length === 0;
        } else {
            return true;
        }
    }

    public getTopOffset(i: number): string {
        return (30 * i).toString() + 'px';
    }

    public getZIndex(i: number): string {
        return (i).toString();
    }

    private getChildCards(i: number): Card[] {
        let cards = [];
        for (let j = i + 1; j < this.pile.shownCards.length; j++) {
            cards.push(this.pile.shownCards[j]);
        }
        return cards;
    }

    private dropped($event: CdkDragDrop<any,any>) {
        {
            let c = $event.previousContainer.element.nativeElement.dataset['cardval'];
            let cards = this.deckService.getCardStack(c);
            this.store.dispatch(attemptMoveToPile({ cards: cards, dest: this.pile}));
        }
    }
}
