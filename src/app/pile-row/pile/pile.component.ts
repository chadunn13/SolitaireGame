import { Component, OnInit, Input } from '@angular/core';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Pile, nullPile } from 'src/app/models/pile.model';

@Component({
    selector: 'app-pile',
    templateUrl: './pile.component.html',
    styleUrls: ['./pile.component.css']
})
export class PileComponent implements OnInit {

    @Input() private index: number = 0;

    public pile: Pile = nullPile;
    private subscriptions: Subscription;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.subscriptions = this.store.select('boardState').subscribe(state => {
            this.pile = state.piles.find(pile => pile.index === this.index);
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }

    public isEmpty(): boolean {
        if (this.pile) {
            return this.pile.hiddenCards.length === 0 && this.pile.shownCards.length === 0;
        } else {
            return true;
        }
    }
}
