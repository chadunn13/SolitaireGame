import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Foundation, nullFoundation } from 'src/app/models/foundation.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, attemptMoveToFoundation } from 'src/app/store';
import { DeckService } from 'src/app/services/deck.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Card } from 'src/app/models/card.model';
import { Suit } from 'src/app/constants/suit';

@Component({
    selector: 'app-foundation',
    templateUrl: './foundation.component.html',
    styleUrls: ['./foundation.component.css']
})
export class FoundationComponent implements OnInit, OnDestroy {

    @Input() private foundation: Foundation;

    constructor(
        private store: Store<AppState>,
    ) { }

    ngOnInit() {
    }

    ngOnDestroy(): void {
    }

    public isEmpty(): boolean {
        if (this.foundation) {
            return this.foundation.cardStack.length === 0;
        } else {
            return true;
        }
    }

    public getTopCard(): Card {
        if (this.foundation.cardStack.length > 0) {
            return this.foundation.cardStack[this.foundation.cardStack.length - 1];
        } else {
            return null;
        }
    }

    public getDisplaySuit() {
        return Suit[this.foundation.suit];
    }

    private dropped($event: CdkDragDrop<any,any>) {
        {
            let c = $event.previousContainer.element.nativeElement.dataset['cardval'];
            let card: Card = { value: c[0], suit: c[1] } as Card;
            this.store.dispatch(attemptMoveToFoundation({ card: card, dest: this.foundation}));
        }
    }
}
