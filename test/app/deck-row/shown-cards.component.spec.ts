import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShownCardsComponent } from '../../../src/app/deck-row/shown-cards/shown-cards.component';

describe('ShownCardsComponent', () => {
    let component: ShownCardsComponent;
    let fixture: ComponentFixture<ShownCardsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShownCardsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShownCardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
