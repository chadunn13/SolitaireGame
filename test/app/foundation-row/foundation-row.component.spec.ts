import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationRowComponent } from '../../../src/app/foundation-row/foundation-row.component';

describe('FoundationRowComponent', () => {
    let component: FoundationRowComponent;
    let fixture: ComponentFixture<FoundationRowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FoundationRowComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FoundationRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
