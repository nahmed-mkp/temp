import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolPortfoliosItemsNotePopupComponent } from './pool-portfolios-items-note-popup.component';

describe('PoolPortfoliosItemsNotePopupComponent', () => {
  let component: PoolPortfoliosItemsNotePopupComponent;
  let fixture: ComponentFixture<PoolPortfoliosItemsNotePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolPortfoliosItemsNotePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolPortfoliosItemsNotePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
