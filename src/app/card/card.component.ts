import { Component, OnInit, Input, Directive, ViewChild, ElementRef, ApplicationRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Suit } from '../constants/suit';
import { Value } from '../constants/value';
import { Card } from '../models/card.model';
import { Store } from '@ngrx/store';
import { AppState, attemptMoveToPile, BoardState } from '../store';
import { DragRef, CdkDrag, CdkDragEnd, CdkDropList, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Pile } from '../models/pile.model';
import { Subscription } from 'rxjs';
import { DeckService } from '../services/deck.service';
import { Foundation } from '../models/foundation.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {


    @Input() private card: Card;
    @Input() private pile: Pile = null;
    @Input() private foundation: Foundation = null;
    @Input() private hidden = false;
    @Input() disabled = false;
    private tempZIndex;
    private subscriptions: Subscription;

    constructor(
        private deckService: DeckService,
        private store: Store<AppState>,
        private el: ElementRef,
    ) {
    }

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        // this.subscriptions.unsubscribe();
    }

    private dragStarted($event) {
        this.tempZIndex = this.el.nativeElement.style['z-index'];
        this.el.nativeElement.style['z-index'] = 100;
    }

    private dragEnded($event: CdkDragEnd) {
        this.el.nativeElement.style['z-index'] = this.tempZIndex;
        $event.source.reset();
    }

    private dragMoved($event) {

    }

    private dropped($event: CdkDragDrop<any,any>) {
        if (this.foundation) {
            // TODO
        } else if (this.pile) {
            let c = $event.previousContainer.element.nativeElement.dataset['cardval'];
            let cards = this.deckService.getCardStack(c);
            this.store.dispatch(attemptMoveToPile({ cards: cards, dest: this.pile}));
        } else {
            console.log("Invalid move");
        }
    }

    public isHidden(): boolean {
        return this.hidden;
    }

    public show(shouldShow: boolean): void {
        this.hidden = !shouldShow;
    }

    public getCard(): Card {
        return this.card;
    }

    public toggleShow(): void {
        this.show(this.hidden);
    }

    public debug(): void {
        console.log(this.getDisplayValue(), this.getDisplaySuit());
    }

    public isRedSuit(): boolean {
        return this.card.suit === "d" || this.card.suit === "h";
    }

    public getDisplayValue(): string {
        return Value[this.card.value][1];
    }

    public getDisplaySuit(): string {
        return Suit[this.card.suit];
    }
}
