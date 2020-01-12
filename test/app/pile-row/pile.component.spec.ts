import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PileComponent } from '../../../src/app/pile-row/pile/pile.component';

describe('PileComponent', () => {
    let component: PileComponent;
    let fixture: ComponentFixture<PileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PileComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
