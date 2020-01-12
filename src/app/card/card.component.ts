import { Component, OnInit, Input } from '@angular/core';
import { Suit } from '../constants/suit';
import { Value } from '../constants/value';
import { Card } from '../models/card.model';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

    @Input() private card: Card;
    @Input() private hidden = false;

    constructor(
    ) {
    }

    ngOnInit() {
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
        return Value[this.card.value];
    }

    public getDisplaySuit(): string {
        return Suit[this.card.suit];
    }
}
